---
description: 'Debugging best practices for Superpowers skills development'
applyTo: '**/*.ts,**/*.js,**/scripts/**/*.ts,**/scripts/**/*.js'
---
# Debugging Instructions for Superpowers

## Debugging Best Practices

When developing skills for the Superpowers library, follow these debugging guidelines:

### Debugging Workflow
1. **Reproduce first** - Create a minimal test case that reproduces the issue
2. **Isolate** - Narrow down the problem to a specific function or module
3. **Hypothesize** - Form a theory about the root cause
4. **Test hypothesis** - Add logging or use debugger to verify
5. **Fix and verify** - Apply fix and confirm with tests

### Logging Standards
- Use structured logging with levels: `debug`, `info`, `warn`, `error`
- Include context: skill name, operation, relevant parameters
- Avoid logging sensitive data (tokens, passwords)
- Use correlation IDs for tracing across async operations

### Debugging Skills
For skill development, use these techniques:
- **Console debugging**: `console.debug()` with skill-specific prefixes
- **VS Code debugger**: Set breakpoints in skill scripts
- **Test-driven debugging**: Write failing test first, then debug
- **Asset validation**: Test templates render correctly with sample data

### Common Issues to Watch
- Front matter parsing errors in SKILL.md files
- Template rendering failures (missing variables, syntax errors)
- Script execution errors (missing dependencies, path issues)
- Asset path resolution (relative vs absolute paths)

### Debugging Tools
- Node.js `--inspect` flag for debugging scripts
- VS Code launch configurations for skill testing
- `console.table()` for structured data inspection
- Conditional breakpoints for loop debugging

### Error Handling
- Always wrap async operations in try/catch
- Provide meaningful error messages with context
- Use custom error classes for skill-specific errors
- Log errors with full stack traces in development