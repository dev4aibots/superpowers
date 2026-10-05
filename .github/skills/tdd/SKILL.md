---
name: 'tdd'
description: 'Test-driven development skill with templates and workflows for Superpowers skills library'
---
# TDD Skill for Superpowers

This skill provides test-driven development workflows, templates, and best practices for developing skills in the Superpowers library.

## When to Use

- Creating new skills that need tests
- Adding tests to existing skills
- Refactoring skill code with confidence
- Setting up test infrastructure for skills

## TDD Workflow

### 1. Red Phase - Write Failing Test
```typescript
// Example: Test for a new skill template renderer
import { describe, it, expect } from 'vitest';
import { renderTemplate } from '../assets/scripts/render-template';

describe('renderTemplate', () => {
  it('should render template with provided variables', () => {
    const template = 'Hello {{name}}!';
    const result = renderTemplate(template, { name: 'World' });
    expect(result).toBe('Hello World!');
  });
});
```

### 2. Green Phase - Make Test Pass
```typescript
// assets/scripts/render-template.ts
export function renderTemplate(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] || '');
}
```

### 3. Refactor Phase - Improve Code
- Extract common patterns
- Improve type safety
- Add error handling
- Optimize performance

## Bundled Assets

### Templates
- `assets/templates/test-file.test.ts` - Unit test template
- `assets/templates/integration-test.spec.ts` - Integration test template
- `assets/templates/test-setup.ts` - Test setup utilities

### Scripts
- `assets/scripts/run-tests.ts` - Test runner with coverage
- `assets/scripts/validate-frontmatter.ts` - Front matter validator
- `assets/scripts/render-template.ts` - Template renderer

### References
- `assets/references/tdd-checklist.md` - TDD checklist for skills
- `assets/references/testing-patterns.md` - Common testing patterns

## Skill Testing Requirements

Every Superpowers skill must include:

1. **Unit tests** for all scripts in `assets/scripts/`
2. **Integration tests** for skill workflows
3. **Template tests** for all templates in `assets/templates/`
4. **Front matter tests** for SKILL.md validation

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific skill tests
npm test -- --filter skill-name
```

## Best Practices

- Test behavior, not implementation
- Keep tests fast and isolated
- Use descriptive test names
- One assertion per test when possible
- Test edge cases and error paths
- Maintain >90% coverage