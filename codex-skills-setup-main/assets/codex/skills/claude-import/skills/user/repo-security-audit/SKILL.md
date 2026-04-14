---
name: repo-security-audit
description: Detects when a GitHub repository URL is pasted and triggers an automatic security audit before running any code from it. Clones into a sandboxed temp directory, scans for malicious patterns, suspicious scripts, obfuscated code, credential exfiltration, and supply chain risks. Use when a user shares a GitHub URL with intent to install, run, or clone it. Triggers include any message containing github.com URLs, gist URLs, or requests like "install this repo", "run this script", "clone this".
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
---

# Repo Security Audit Skill

## Trigger Detection

Activate this skill whenever the user's message contains:
- `github.com/<owner>/<repo>` URLs
- `gist.githubusercontent.com` URLs
- `raw.githubusercontent.com` URLs
- Requests to install, clone, or run code from a remote source

## Audit Pipeline

### Phase 1: Sandboxed Clone

Clone into an isolated temp directory. Use `--depth 1` to minimize download. Never clone into the user's working directory first. All analysis happens inside `/tmp/repo-audit-*`.

### Phase 2: Static Analysis Checklist

Run these checks IN ORDER using Grep and Read tools (prefer dedicated tools over shell grep). Report findings for each.

#### 2.1 Install/Post-Install Script Hooks
Search for lifecycle scripts in package.json: `preinstall`, `postinstall`, `prepare`, `prepublish`. Check Makefiles for `curl`, `wget`, `bash -c`, `sh -c` patterns.

#### 2.2 Shell Script Analysis
Find all `.sh`, `.bash`, `.zsh` files. Scan for dangerous patterns:
- Piped curl/wget to shell (`curl|bash`, `wget|sh`)
- `rm -rf /`, `mkfifo`, `/dev/tcp`, `nc -e`
- `base64 -d` piped to execution
- Inline python/ruby execution with imports

#### 2.3 Obfuscation and Encoding Detection
Scan for:
- Base64 encode/decode (`atob`, `btoa`, `Buffer.from`, `b64decode`)
- Hex-encoded strings, char code assembly (`String.fromCharCode`, `\x` sequences)
- Dynamic code execution (`eval()`, `Function()`, `exec()` with dynamic input)

#### 2.4 Network and Exfiltration Patterns
Scan for:
- Outbound connections to unusual destinations (excluding tests/node_modules)
- DNS/IP exfiltration (`.onion`, `ngrok`, `webhook.site`, `requestbin`, `pipedream`)
- Credential harvesting (`process.env`, `os.environ`) in non-standard contexts

#### 2.5 File System Danger Patterns
Scan for writes to sensitive locations:
- `.bashrc`, `.zshrc`, `.profile`, `.ssh/`, `.gnupg`, `.aws/`, `.claude`
- `crontab`, `/etc/` modifications
- Recursive deletion or destructive file operations

#### 2.6 Dependency Supply Chain
Analyze dependency manifests for:
- Git or URL-based dependencies in package.json
- Local file references (`file:`)
- Suspicious or typosquatted package names
- Custom index URLs in pip requirements (`--index-url`, `--extra-index-url`)

#### 2.7 Docker and Container Risks
If Dockerfiles are present, check for:
- Privilege escalation (`--privileged`, `USER root`)
- Suspicious base images
- Inline downloads during build

### Phase 3: Verdict

After all checks, produce a structured report:

```
## Security Audit Report: <repo-name>

### Risk Level: [SAFE | CAUTION | DANGEROUS]

### Findings:
- [ ] Install hooks: <clean/found>
- [ ] Shell scripts: <clean/suspicious patterns>
- [ ] Obfuscation: <none/detected>
- [ ] Network calls: <expected/suspicious>
- [ ] File system access: <safe/writes to sensitive paths>
- [ ] Dependencies: <clean/suspicious>
- [ ] Containers: <clean/risky>

### Details:
<list each finding with file:line references>

### Recommendation:
<PROCEED / PROCEED WITH CAUTION / DO NOT INSTALL>
```

### Phase 4: Cleanup

Always remove the sandbox temp directory after the audit completes.

## Rules

1. **NEVER** run `npm install`, `pip install`, `bun install`, or any package manager inside the sandbox. Only read files.
2. **NEVER** execute any script from the repo during audit. Read-only analysis only.
3. If the verdict is DANGEROUS, refuse to proceed and explain why.
4. If the verdict is CAUTION, present findings and ask the user for explicit confirmation before proceeding.
5. If the verdict is SAFE, proceed with the user's original request.
