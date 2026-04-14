---
name: typescript-best-practices
description: Provides TypeScript patterns for type-first development, making illegal states unrepresentable, exhaustive handling, and runtime validation. Must use when reading or writing TypeScript/JavaScript files.
---

# TypeScript Best Practices

## Type-First Development

Types define the contract before implementation:

1. **Define the data model** - types, interfaces, and schemas first
2. **Define function signatures** - input/output types before logic
3. **Implement to satisfy types** - let the compiler guide completeness
4. **Validate at boundaries** - runtime checks where data enters the system

### Make Illegal States Unrepresentable

**Discriminated unions for mutually exclusive states:**
```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

**Branded types for domain primitives:**
```ts
type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };
```

**Const assertions for literal unions:**
```ts
const ROLES = ['admin', 'user', 'guest'] as const;
type Role = typeof ROLES[number];
```

## Instructions

- Enable `strict` mode; model data with interfaces and types.
- Every code path returns a value or throws; use exhaustive `switch` with `never` checks.
- Propagate errors with context; catching requires re-throwing or returning a meaningful result.
- Handle edge cases explicitly: empty arrays, null/undefined inputs, boundary values.
- Use `await` for async calls; wrap external calls with contextual error messages.

## Runtime Validation with Zod

- Define schemas as single source of truth; infer TypeScript types with `z.infer<>`.
- Use `safeParse` for user input; use `parse` at trust boundaries.
- Compose schemas with `.extend()`, `.pick()`, `.omit()`, `.merge()`.
- Add `.transform()` for data normalization at parse time.

## Configuration

- Load config from environment variables at startup; validate with Zod before use.
- Define a typed config object as single source of truth.
- Use sensible defaults for development; require explicit values for production secrets.
