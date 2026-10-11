# Testing

The storefront ships with three test layers:

| Layer | Tool | Location | What it covers |
| --- | --- | --- | --- |
| Unit | Vitest | `tests/unit/` | Pure logic — repository, validators, formatting, cart context |
| Component | Vitest + React Testing Library | `tests/components/` | UI components in isolation |
| End-to-end | Playwright | `tests/e2e/` | Browser-driven flows across the storefront |

## Running

```bash
npm test                # vitest (unit + component)
npm run test:watch      # vitest in watch mode
npm run test:e2e        # playwright
npm run test:e2e:install  # install chromium (first time only)
```

`npm run typecheck` and `npm run lint` are part of CI gates.

## Conventions

- Tests live next to the source root (`tests/`), not beside the file under
  test. This keeps the production source clean.
- Names follow `*.test.ts` / `*.test.tsx`.
- Use `userEvent` over `fireEvent` for accessibility-friendly events.
- Mock `next/navigation` only when necessary — prefer rendering real pages
  where practical.

## Adding tests for new code

1. **Repository / data logic** → unit test in `tests/unit/`.
2. **UI component with state** → component test in `tests/components/`.
3. **Flow that touches the rendered page or the URL** → Playwright test in
   `tests/e2e/`.

## What we explicitly do not test

- The current demo's "no real payment" stance: there's nothing to assert
  beyond the labels and demo notice. Those are covered by Playwright.
- Sitemap/robots metadata content (covered by manual review; can be extended
  with snapshot tests if you prefer).

## Continuous integration

The recommended CI sequence:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Each step is independent — a failure halts the pipeline immediately.