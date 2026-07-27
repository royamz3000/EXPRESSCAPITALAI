# Asset and licensing inventory

This file records what can be established from the repository. It is not a claim of copyright ownership and is not legal advice.

## Production visual assets

All production images are stored locally; the application does not hotlink remote photography or icons.

| Asset group | Repository files | Recorded provenance/license |
| --- | --- | --- |
| Express Capital marks and app icons | `public/favicon.png`, `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png` | Not recorded in the repository |
| Marina and yacht artwork | `public/hero-yacht-graphite-ivory-v4.webp`, `public/hero-yacht-graphite-ivory-mobile-v1.webp`, `public/cta-yacht-background.png`, `public/images/cta-yacht-engraving-v1.webp` | Not recorded in the repository |
| Capital in Motion artwork | `public/images/capital-in-motion-desktop.webp`, `public/images/capital-in-motion-mobile.webp` | Not recorded in the repository |
| Industry editorial photography/artwork | `public/industries-*-editorial*.png` | Not recorded in the repository |
| Process artwork | `public/process-intake-v3.webp`, `public/process-underwriting-v3.webp`, `public/process-completion-v3.webp` | Not recorded in the repository |

Before transfer or public launch, the client should confirm that it owns or holds commercial-use rights for every item above. Keep source files, purchase receipts, stock licenses, model/property releases, agency agreements, and creator permissions in the client’s records rather than in the public web repository unless counsel directs otherwise.

When replacing an image, preserve appropriate dimensions and crop behavior, update alt text when the subject changes, and run the production build to confirm Next.js optimization succeeds.

## Fonts

`src/lib/fonts.ts` loads Libre Caslon Display through `next/font/google`. Next.js downloads the font during the build and serves it from the application rather than requesting it from a visitor’s browser. The upstream Libre Caslon project identifies the family as licensed under the [SIL Open Font License 1.1](https://github.com/thundernixon/Libre-Caslon). Retain the license notice when distributing font files.

The remaining CSS font names are system fallbacks and are not bundled by this repository.

## Code dependencies

The direct packages installed for this audit declare the following licenses in their package metadata:

- MIT: Next.js, React, React DOM, Tailwind CSS, ESLint, `eslint-config-next`, `@tailwindcss/postcss`, and the installed `@types/*` packages
- Apache-2.0: TypeScript

Transitive package versions and integrity hashes are fixed by `package-lock.json`. Each dependency remains governed by its own license and notices; use an automated dependency-license report as part of any organization-specific compliance process.

## Repository license

No project-level `LICENSE` file is present. The repository therefore does not itself document who owns the custom source code or what rights are granted to recipients. The transferring parties should resolve that in the client agreement or add a license approved by the rights holder; this handoff does not infer or assign those rights.
