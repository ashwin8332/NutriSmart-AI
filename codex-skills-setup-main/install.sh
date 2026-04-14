#!/bin/bash
set -euo pipefail

echo "============================================"
echo "  Codex Skills Setup Installer"
echo "============================================"
echo ""

CODEX_DIR="$HOME/.codex"
CODEX_SKILLS_DIR="$CODEX_DIR/skills"

mkdir -p "$CODEX_SKILLS_DIR"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

REPO_TARBALL_URL="https://codeload.github.com/Himanshu040604/codex-skills-setup/tar.gz/refs/heads/main"

echo "[*] Downloading codex-skills-setup bundle..."
curl -fsSL "$REPO_TARBALL_URL" -o "$TMP_DIR/repo.tar.gz"
tar -xzf "$TMP_DIR/repo.tar.gz" -C "$TMP_DIR"

ASSET_DIR="$TMP_DIR/codex-skills-setup-main/assets/codex"
if [ ! -d "$ASSET_DIR" ]; then
  echo "[!] assets/codex not found in bundle"
  exit 1
fi

cp -f "$ASSET_DIR/AGENTS.md" "$HOME/AGENTS.md"
cp -f "$ASSET_DIR/skills.md" "$CODEX_DIR/skills.md"

rm -rf "$CODEX_SKILLS_DIR/claude-import"
cp -a "$ASSET_DIR/skills/claude-import" "$CODEX_SKILLS_DIR/"

USER_SKILLS=$(find "$CODEX_SKILLS_DIR/claude-import/skills/user" -type f -name 'SKILL.md' 2>/dev/null | wc -l | tr -d ' ')
PLUGIN_SKILLS=$(find "$CODEX_SKILLS_DIR/claude-import/skills/plugins" -type f -name 'SKILL.md' 2>/dev/null | wc -l | tr -d ' ')
PLUGIN_CONFIGS=$(find "$CODEX_SKILLS_DIR/claude-import/plugins" -type f -name 'plugin.json' 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo "[+] Installed ~/AGENTS.md"
echo "[+] Installed ~/.codex/skills.md"
echo "[+] Installed ~/.codex/skills/claude-import"
echo ""
echo "Counts:"
echo "  - user skills: $USER_SKILLS"
echo "  - plugin skills: $PLUGIN_SKILLS"
echo "  - plugin configs: $PLUGIN_CONFIGS"
echo ""
echo "Reinstall command:"
echo "  curl -fsSL https://raw.githubusercontent.com/Himanshu040604/codex-skills-setup/main/install.sh | bash"
