# Debugging Techniques Reference

This document provides a comprehensive guide to debugging techniques for Superpowers skills development.

## Table of Contents
1. [Console Debugging](#console-debugging)
2. [VS Code Debugger](#vs-code-debugger)
3. [Test-Driven Debugging](#test-driven-debugging)
4. [Binary Search Debugging](#binary-search-debugging)
5. [Logging Best Practices](#logging-best-practices)
6. [Common Patterns](#common-patterns)

## Console Debugging

### Structured Logging
```typescript
// Use consistent log format
console.debug('[skill-name]', { 
  operation: 'renderTemplate', 
  input: variables,
  timestamp: new Date().toISOString()
});

console.info('[skill-name]', 'Operation completed', { 
  duration: '45ms',
  result: 'success'
 });

console.warn('[skill-name]', 'Non-critical issue', { 
  issue: 'missing optional variable',
  variable: 'description'
});

console.error('[skill-name]', 'Operation failed', { 
  error: error.message,
  stack: error.stack,
  context: { skill: 'my-skill', input }
});
```

### Console Utilities
```typescript
// Table for structured data
console.table([
  { skill: 'tdd', status: 'pass', tests: 15 },
  { skill: 'debugging', status: 'fail', tests: 3 }
]);

// Group related logs
console.group('Skill Execution: my-skill');
console.debug('Loading assets...');
console.debug('Validating front matter...');
console.info('Execution complete');
console.groupEnd();

// Time operations
console.time('render-template');
const result = renderTemplate(template, vars);
console.timeEnd('render-template'); // render-template: 2.34ms

// Assert in development
console.assert(condition, 'Assertion failed:', { expected, actual });
```

## VS Code Debugger

### Launch Configuration
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Skill Script",
      "program": "${workspaceFolder}/.github/skills/${input:skillName}/assets/scripts/main.ts",
      "args": ["--debug"],
      "console": "integratedTerminal",
      "env": {
        "DEBUG": "skill:*"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${workspaceFolder}/.github/skills/${input:skillName}/**/*.test.ts"],
      "console": "integratedTerminal"
    }
  ],
  "inputs": [
    {
      "type": "promptString",
      "id": "skillName",
      "description": "Skill name to debug",
      "default": "tdd"
    }
  ]
}
```

### Debugging Techniques
1. **Breakpoints** - Set on specific lines, conditional breakpoints
2. **Watch expressions** - Monitor variable values
3. **Call stack** - Trace execution path
4. **Debug console** - Evaluate expressions at breakpoints
5. **Logpoints** - Log without pausing (right-click line → Add Logpoint)

### Conditional Breakpoints
```typescript
// Right-click breakpoint → Edit Breakpoint → Condition
// Example: variableName === 'specific-value'
// Example: loopIndex > 100
// Example: error instanceof TypeError
```

## Test-Driven Debugging

### Workflow
1. **Write failing test** that reproduces the bug
2. **Run test** - confirm it fails
3. **Debug test** - set breakpoints, inspect state
4. **Fix code** - make test pass
5. **Refactor** - improve code while keeping test green
6. **Add regression test** - prevent future regressions

### Example
```typescript
// 1. Failing test for bug
it('should handle empty template variables', () => {
  const result = renderTemplate('Hello {{name}}!', {});
  // Bug: returns 'Hello {{name}}!' instead of 'Hello !'
  expect(result).toBe('Hello !');
});

// 2. Debug - set breakpoint in renderTemplate
// 3. Fix - update regex to handle missing vars
// 4. Test passes
// 5. Add more edge case tests
```

## Binary Search Debugging

### Technique
When you don't know where the bug is:
1. Comment out half the code
2. Test - does bug persist?
3. If yes, bug is in remaining half
4. If no, bug is in commented half
5. Repeat until isolated to single function/line

### Example
```typescript
// Original: 100 lines of processing
function process(data) {
  // Step 1: validate
  // Step 2: transform
  // Step 3: enrich
  // Step 4: output
}

// Comment out steps 3-4
function process(data) {
  // Step 1: validate
  // Step 2: transform
  // Step 3: enrich  ← COMMENTED
  // Step 4: output  ← COMMENTED
}
// Test - if bug gone, it's in 3 or 4
```

## Logging Best Practices

### Log Levels
| Level | Use Case | Production |
|-------|----------|------------|
| `debug` | Detailed diagnostic info | No |
| `info` | General operational info | Yes |
| `warn` | Potential issues, recoverable | Yes |
| `error` | Failures, data loss | Yes |

### Context Enrichment
Always include:
- Skill name
- Operation being performed
- Relevant input parameters
- Correlation IDs for async flows
- Timestamps

```typescript
const correlationId = crypto.randomUUID();
console.info('[skill]', 'Starting operation', { 
  correlationId, 
  operation: 'loadAssets',
  skill: 'my-skill'
});
```

### Structured Log Format
```typescript
interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  skill: string;
  operation: string;
  correlationId?: string;
  context?: Record<string, unknown>;
  error?: {
    message: string;
    stack?: string;
  };
}
```

## Common Patterns

### Debugging Async Code
```typescript
// Use Promise.allSettled for parallel debugging
const results = await Promise.allSettled([
  loadTemplates(),
  loadScripts(),
  loadReferences()
]);

results.forEach((result, index) => {
  if (result.status === 'rejected') {
    console.error(`Asset load failed [${index}]`, result.reason);
  }
});
```

### Debugging Template Rendering
```typescript
// Validate before rendering
const missing = validateTemplateVariables(template, variables);
if (missing.length > 0) {
  console.warn('Missing template variables', { missing, template });
}

// Render with fallback
const rendered = renderTemplate(template, {
  ...defaults,
  ...variables
});
```

### Debugging File System Operations
```typescript
// Check paths before operations
const skillPath = resolve('.github', 'skills', skillName);
if (!existsSync(skillPath)) {
  console.error('Skill directory not found', { skillName, skillPath });
  return;
}

// Use try/catch for all fs operations
try {
  const content = await fs.readFile(filePath, 'utf-8');
} catch (error) {
  console.error('File read failed', { filePath, error });
}
```

### Debugging Front Matter
```typescript
// Validate front matter early
const validation = validateFrontMatter(frontMatter);
if (!validation.valid) {
  console.error('Invalid front matter', { issues: validation.issues });
  return;
}

// Check name matches folder
if (frontMatter.name !== folderName) {
  console.warn('Front matter name mismatch', { 
    frontMatter: frontMatter.name, 
    folder: folderName 
  });
}
```

## Quick Reference Card

| Task | Command/Technique |
|------|-------------------|
| Start debugger | `F5` in VS Code |
| Toggle breakpoint | `F9` |
| Step over | `F10` |
| Step into | `F11` |
| Step out | `Shift+F11` |
| Continue | `F5` |
| Restart | `Ctrl+Shift+F5` |
| Stop | `Shift+F5` |
| Open debug console | `Ctrl+Shift+Y` |
| Add logpoint | Right-click line → Add Logpoint |
| Conditional breakpoint | Right-click breakpoint → Edit |
| Watch expression | Debug panel → Watch → + |
| Evaluate in console | Debug console → type expression |