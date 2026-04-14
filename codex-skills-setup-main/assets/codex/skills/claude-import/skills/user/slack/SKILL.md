---
name: slack
description: Interact with Slack workspaces using browser automation. Use when the user needs to check unread channels, navigate Slack, send messages, extract data, find information, search conversations, or automate any Slack task. Triggers include "check my Slack", "what channels have unreads", "send a message to", "search Slack for", "extract from Slack", "find who said", or any task requiring programmatic Slack interaction.
allowed-tools: Bash(agent-browser:*), Bash(npx agent-browser:*)
---

# Slack Automation

Interact with Slack workspaces to check messages, extract data, and automate common tasks.

## Quick Start

```bash
# Connect to existing session on port 9222
agent-browser connect 9222

# Or open Slack if not already running
agent-browser open https://app.slack.com
```

Then take a snapshot:

```bash
agent-browser snapshot -i
```

## Core Workflow

1. **Connect/Navigate**: Open or connect to Slack
2. **Snapshot**: Get interactive elements with refs
3. **Navigate**: Click tabs, expand sections, or navigate to specific channels
4. **Extract/Interact**: Read data or perform actions
5. **Screenshot**: Capture evidence of findings

## Common Tasks

### Checking Unread Messages

```bash
agent-browser connect 9222
agent-browser snapshot -i
# Navigate to Activity tab to see all unreads
agent-browser click @e14  # Activity tab
agent-browser wait 1000
agent-browser screenshot activity-unreads.png
```

### Navigating to a Channel

```bash
agent-browser snapshot -i
agent-browser click @e94  # Channel ref
agent-browser wait --load networkidle
agent-browser screenshot channel.png
```

### Finding Messages/Threads

```bash
agent-browser snapshot -i
agent-browser click @e5  # Search button
agent-browser fill @e_search "keyword"
agent-browser press Enter
agent-browser wait --load networkidle
agent-browser screenshot search-results.png
```

## Best Practices

- **Connect to existing sessions**: Use `agent-browser connect 9222` if Slack is already open.
- **Take snapshots before clicking**: Always `snapshot -i` to identify refs before clicking.
- **Re-snapshot after navigation**: After navigating, take a fresh snapshot.
- **Use JSON snapshots for parsing**: Use `snapshot --json` for machine-readable output.
- **Pace interactions**: Add `sleep 1` between rapid interactions.
- **Scroll in sidebar**: Use `agent-browser scroll down 300 --selector ".p-sidebar"`.
