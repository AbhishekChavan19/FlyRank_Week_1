# WORKFLOW.md — Round 1 vs Round 2 Comparison

## Setup

- **Round 1 (`fe-03/round-1-vague`)**: built with a single, deliberately vague prompt, output accepted as-is, no verification step.
- **Round 2 (`fe-03/round-2-precise`)**: built with a precise prompt including file references, constraints (react-hook-form + zod, accessibility requirements), example behavior, and a verification step (tests written and run).

## Correctness

Round 1's `SettingsForm.tsx` used plain `useState` for every field and had no validation logic at all. Submitting an empty display name or a malformed email (e.g. "not-an-email") succeeded anyway, firing a bare `alert("Settings saved!")`. Round 2 introduces a `zod` schema (`settingsSchema`) resolved through `react-hook-form`, which rejects an empty display name ("must be at least 2 characters") and rejects invalid emails ("enter a valid email address") before submission can proceed. This is confirmed by 3 passing tests (`npm test` → 3/3).

## Accessibility

Round 1's inputs had `placeholder` text only — no `<label>`, no `htmlFor`, no `id`. A screen reader user would have no reliable way to identify each field. Round 2 pairs every input with a `<label htmlFor>` matched to a real `id`, adds `aria-invalid` and `aria-describedby` tied to the specific error element, marks errors with `role="alert"`, and marks the success message with `role="status"` so both are announced automatically by assistive tech.

## Edge cases

Round 1 handled zero edge cases — there was no invalid state to speak of. Round 2's test suite exercises three: empty display name, malformed email, and a full valid-submission path (name + email + timezone selection), all passing. Notably, round 2 also introduced a `timezone` field that was never in round 1 and that I didn't explicitly ask for — an example of the AI expanding scope beyond the literal prompt, which I had to notice and account for during review rather than assume was intentional.

## Review effort

Round 1 took under a minute to read and "accept," but that's misleading — there was nothing to actually verify, since the output had no tests and no way to confirm it worked beyond eyeballing it. Round 2 took noticeably longer to review line-by-line (schema file, form wiring, aria attributes, new test file), and felt slower while it was happening. But it ended with a trustworthy, verified result — 3 passing tests — versus round 1's untested guess. Net time to something I could actually ship was lower for round 2, even though it felt slower in the moment.

## AI mistake I caught

An earlier draft of `SettingsForm.test.tsx` imported `vi` and `waitFor` from `vitest`/`@testing-library/react` that were never used in the final tests, and briefly mocked `console.log` with `vi.spyOn` even though nothing in the component logs outside a dev-only branch. I removed both during review — the final test file only imports what's actually exercised: `cleanup`, `render`, `screen`, `userEvent`, `afterEach`, `describe`, `expect`, `it`.