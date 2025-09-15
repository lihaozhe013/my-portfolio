# Project Agent Instructions

## Version control

- Do not create a commit or push changes after every task by default.
- Keep completed changes in the working tree unless the user explicitly asks for
  a commit or push.
- Before every commit, run `pnpm exec prettier . --write` and then run the
  relevant validation checks. Generated lockfiles are excluded through
  `.prettierignore`.

## Design consistency

- Prefer shared layout, typography, and component tokens across all routes.
- Keep the first heading on About, Timeline, Contact, and future content pages
  on the shared `.page-title` scale used by Contact.
- Do not create page-specific visual variants when an existing shared style can
  express the intended hierarchy.
- Design all visual layouts for comfortable screen reading. Keep body copy to no
  more than 80 English characters or 40 Chinese characters per line where
  practical, using responsive content widths to prevent overly long lines.
- If a file exceeds 1,500 lines, assess whether it should be split and extract
  large standalone components into separate files where appropriate.

## Content and localization

- Read all concrete, user-facing content from JSON files; do not hardcode
  content in components or pages. This includes content that may grow in the
  future, such as project category labels, tags, navigation items, metadata, and
  list entries.
- Treat the English `translation.json` as the source of truth when checking
  content completeness. Only the English translation file needs to be checked;
  Chinese translations do not require completeness or parity checks.
