# Global Codex Instructions

This file defines default behavior for Codex across repositories.

## Scope
- Keep this file global and generic.
- Put project-specific rules in each repo-level `AGENTS.md`.
- Prefer local project rules when they conflict with global defaults.

## Working Style
- Be concise, explicit, and practical.
- Confirm assumptions before risky or destructive actions.
- Prefer small, focused changes over broad refactors.

## Implementation Rules
- Match existing conventions in the target codebase.
- Keep modules reasonably small and single-purpose.
- Add tests for behavioral changes when possible.
- Explain key tradeoffs when there are multiple valid approaches.

## Safety
- Never expose secrets or credentials.
- Avoid destructive shell commands unless explicitly requested.
- Prefer read-only analysis before executing untrusted code.
