# Claude to Codex Migration Bundle

This folder contains your Claude skill/plugin configuration converted for Codex use.

## What was copied
- User Claude skills: 12
- Enabled Claude plugins: 88
- Plugin skill directories copied: 152

## Paths
- `skills/user/*`: direct copies of `~/.claude/skills/*`
- `skills/plugins/*`: skill directories extracted from enabled Claude plugins
- `plugins/*/plugin.json`: preserved plugin metadata from Claude plugin packages
- `config/claude-settings-subset.json`: Claude settings subset relevant to skills/plugins
- `manifest.json`: full migration manifest

## MCP server mappings detected in plugin metadata
- sentry@claude-plugins-official :: sentry -> {"type":"http","url":"https://mcp.sentry.dev/mcp"}
