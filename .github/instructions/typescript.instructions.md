---
description: 'TypeScript best practices for Superpowers skills library'
applyTo: '**/*.ts,**/*.tsx'
---
# TypeScript Instructions for Superpowers

## TypeScript Best Practices

When writing TypeScript code for the Superpowers skills library:

### Type Safety
- Enable `strict: true` in tsconfig.json
- Use explicit types for public APIs
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and primitives
- Avoid `any` - use `unknown` when type is truly unknown

### Code Style
- Use functional programming patterns where appropriate
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Destructure objects and arrays
- Use template literals for string interpolation

### Skill Development Patterns
```typescript
// Skill entry point pattern
export interface SkillContext {
  name: string;
  version: string;
  assets: SkillAssets;
}

export interface SkillAssets {
  templates: Record<string, string>;
  scripts: Record<string, () => Promise<void>>;
  references: Record<string, string>;
}

// Front matter parsing
export interface SkillFrontMatter {
  name: string;
  description: string;
}

// Asset loading
export async function loadSkillAssets(skillPath: string): Promise<SkillAssets> {
  // Implementation
}
```

### Error Handling
- Use `Result<T, E>` pattern for fallible operations
- Create custom error classes extending `Error`
- Include error codes for programmatic handling

### Async Patterns
- Use `async/await` over Promise chains
- Handle multiple async operations with `Promise.allSettled()`
- Set timeouts for external calls

### Testing Types
- Export types for consumers to use
- Use `type Tests = Expect<...>` for type-level tests
- Test type inference with `tsd` or similar tools