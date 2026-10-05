---
description: 'Test-driven development guidelines for Superpowers skills library'
applyTo: '**/*.test.ts,**/*.spec.ts,**/tests/**/*.ts'
---
# TDD Instructions for Superpowers

## Test-Driven Development Practices

When working on the Superpowers skills library, follow these TDD principles:

### Red-Green-Refactor Cycle
1. **Red**: Write a failing test that defines the expected behavior
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests passing

### Test Structure
- Use descriptive test names: `should [expected behavior] when [condition]`
- Group related tests with `describe` blocks
- Use `beforeEach`/`afterEach` for setup/teardown
- Keep tests independent and isolated

### Skill Testing Requirements
Each skill must have:
- Unit tests for all helper scripts in `assets/scripts/`
- Integration tests for skill workflows
- Template rendering tests for `assets/templates/`
- Front matter validation tests

### Test File Naming
- `*.test.ts` for unit tests
- `*.spec.ts` for specification/integration tests
- Place in `__tests__/` or `tests/` folder adjacent to source

### Assertions
- Use `expect` with specific matchers
- Test one behavior per test case
- Avoid testing implementation details

### Coverage Targets
- Aim for >90% coverage on skill logic
- 100% coverage on public APIs
- Cover edge cases and error paths