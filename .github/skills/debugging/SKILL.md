---
name: 'debugging'
description: 'Debugging skill with techniques, tools, and workflows for Superpowers skills development'
---
# Debugging Skill for Superpowers

This skill provides systematic debugging techniques, tools, and workflows for developing and maintaining skills in the Superpowers library.

## When to Use

- Debugging skill scripts and templates
- Troubleshooting skill execution failures
- Adding debugging capabilities to skills
- Teaching debugging best practices

## Debugging Workflow

### 1. Reproduce the Issue
Create a minimal test case that reproduces the problem:
```typescript
// Debug script example
import { debugSkill } from './assets/scripts/debug-skill';

await debugSkill('my-skill', {
  input: 'test data',
  expectedOutput: 'expected result'
});
```

### 2. Isolate the Problem
Use binary search debugging:
- Comment out half the code
- Test if issue persists
- Narrow down to specific function/line

### 3. Hypothesize and Test
Form theories and verify with:
- Console logging with structured output
- VS Code debugger breakpoints
- Test-driven debugging (write failing test first)

### 4. Fix and Verify
Apply fix and confirm with:
- Original reproduction case
- Related test cases
- Regression tests

## Bundled Assets

### Templates
- `assets/templates/debug-script.ts` - Debug script template
- `assets/templates/launch.json` - VS Code launch configuration
- `assets/templates/test-debug.test.ts` - Debug test template

### Scripts
- `assets/scripts/debug-skill.ts` - Skill debugger utility
- `assets/scripts/inspect-assets.ts` - Asset inspector
- `assets/scripts/trace-execution.ts` - Execution tracer

### References
- `assets/references/debugging-techniques.md` - Debugging techniques guide
- `assets/references/vscode-debugging.md` - VS Code debugging setup
- `assets/references/common-issues.md` - Common skill issues and fixes

## Debugging Tools

### Console Debugging
```typescript
// Structured logging
console.debug('[skill-name]', { operation: 'renderTemplate', input: variables });
console.info('[skill-name]', 'Template rendered successfully');
console.warn('[skill-name]', 'Template variable missing', { key: 'name' });
console.error('[skill-name]', 'Render failed', error);
```

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Skill",
      "program": "${workspaceFolder}/.github/skills/skill-name/assets/scripts/main.ts",
      "args": ["--debug"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Test-Driven Debugging
```typescript
// Write failing test first
it('should handle missing template variable', () => {
  const result = renderTemplate('Hello {{missing}}!', {});
  expect(result).toBe('Hello !'); // or throw error
});

// Then debug to make it pass
```

## Common Skill Issues

### Front Matter Parsing
- Missing `name` or `description`
- YAML syntax errors
- Name doesn't match folder

### Template Rendering
- Missing variables
- Syntax errors in templates
- Incorrect placeholder format

### Script Execution
- Missing dependencies
- Path resolution issues
- Async/await problems
- Permission errors

### Asset Loading
- Incorrect relative paths
- Missing asset files
- Encoding issues

## Debugging Checklist

- [ ] Can reproduce issue consistently
- [ ] Identified root cause
- [ ] Fix addresses root cause
- [ ] Tests pass after fix
- [ ] No regression in related functionality
- [ ] Documentation updated if needed