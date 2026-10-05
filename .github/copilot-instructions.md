# GitHub Copilot Instructions for Superpowers

This repository contains the **Superpowers** core skills library for AI-assisted development. These instructions guide Copilot when working with this codebase.

## Project Overview

Superpowers is a collection of reusable skills (TDD, debugging, collaboration patterns, proven techniques) that enhance AI coding assistants. The library is designed to be:
- **Language-agnostic** - Skills work across multiple programming languages
- **Framework-agnostic** - Applicable to any tech stack
- **Composable** - Skills can be combined for complex workflows
- **Extensible** - Easy to add new skills following established patterns

## Core Principles

1. **Skills over scripts** - Prefer creating reusable skills with bundled assets over one-off scripts
2. **Test-driven development** - All skills should include tests and follow TDD practices
3. **Documentation-first** - Every skill needs clear documentation (SKILL.md with front matter)
4. **Bundled assets** - Include templates, scripts, and reference data within skill folders
5. **Version compatibility** - Maintain backward compatibility when updating skills

## Code Style Guidelines

### TypeScript/JavaScript (Primary Languages)
- Use TypeScript with strict mode enabled
- Prefer functional programming patterns
- Use modern ES2022+ features
- Follow the existing code style in the repository
- Use descriptive variable and function names

### Skill Structure
Each skill in `.agents/plugins/` or `.github/skills/` must follow this structure:
```
skill-name/
├── SKILL.md              # Main instruction file with front matter
├── assets/               # Bundled assets (templates, scripts, reference data)
│   ├── templates/        # Template files
│   ├── scripts/          # Helper scripts
│   └── references/       # Reference documentation
└── package.json          # Optional: for skills with dependencies
```

### Front Matter Requirements
All `SKILL.md` and `.instructions.md` files must include YAML front matter:
```yaml
---
name: 'skill-name'           # Required: matches folder name
description: 'Brief description of what this skill provides and when to use it'
---
```

## Development Workflow

### Adding a New Skill
1. Create a new folder under `.github/skills/` with kebab-case name
2. Add `SKILL.md` with proper front matter and detailed instructions
3. Include bundled assets in `assets/` subfolder
4. Add tests for the skill
5. Update documentation if needed

### Updating Existing Skills
1. Fetch the latest version from awesome-copilot if applicable
2. Compare versions and document changes
3. Preserve backward compatibility
4. Update bundled assets if needed
5. Run tests to verify changes

## Testing Standards

- Write unit tests for all helper scripts
- Include integration tests for skill workflows
- Test bundled assets (templates render correctly, scripts execute)
- Verify front matter parsing works correctly

## Collaboration Patterns

- Use conventional commits for all changes
- Reference issues in commit messages
- Keep PRs focused on single skill or feature
- Include skill name in PR title when applicable

## What Copilot Should NOT Do

- Don't modify `.claude-plugin/` files (these are for Claude Code, not Copilot)
- Don't change the plugin.json or marketplace.json without explicit request
- Don't add skills that duplicate existing functionality
- Don't remove bundled assets without verifying they're unused

## Relevant Skills Context

When working on this repo, Copilot should be aware of these related skills from awesome-copilot:
- `acquire-codebase-knowledge` - For mapping/documenting codebases
- `add-educational-comments` - For adding educational comments to code
- `tdd` - Test-driven development practices
- `debugging` - Debugging techniques and tools
- `code-review` - Code review best practices

## File Patterns

- `*.md` - Documentation and skill instructions
- `*.ts` / `*.js` - Skill implementation scripts
- `*.json` - Configuration and package files
- `assets/**/*` - Bundled skill assets (templates, scripts, references)