# Express Capital launch handoff

## Stack and commands

This is a Next.js 16.2 App Router application using React 19.2, TypeScript 5, Tailwind CSS 4, npm, and local image assets. Use Node.js 20.9 or newer.

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

Production hosting must support a Node.js Next.js application. Install with `npm ci`, build with `npm run build`, and start with `npm run start`. The canonical production URL is currently defined in `src/lib/seo.ts` as `https://www.expresscapital.ai`; it is not environment-driven.

## Active public routes

- `/` — homepage and capital-request form
- `/about` — company approach
- `/contact` — contact inquiry form
- `/industries` — supported industries and anchored industry details
- `/resources/faq` — locally maintained FAQ with question hashes
- `/privacy` — privacy policy
- `/disclaimer` — terms and commercial-finance disclaimer

The framework also serves `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, icons, the Open Graph image, and the custom not-found page. `POST /api/lead-request` and `POST /api/contact-inquiry` are server endpoints, not public content routes.

## Form delivery

Form validation and protected submission endpoints are implemented, but the client’s production delivery provider and destination remain unconfirmed. A provider adapter must be connected before the forms can deliver live inquiries.

The application and contact forms submit separate JSON payloads to their respective API routes. Both routes retain strict client and server validation, same-origin and JSON content-type checks, a honeypot, a 12 KiB request limit, rate limiting, idempotency protection, UTM data, and source-path handling. The forms retain accessible inline errors and status messages.

Both routes call the provider-neutral delivery contract in `src/lib/submission-delivery.ts`. No production adapter is selected. Current behavior is:

- invalid submissions return validation errors;
- valid submissions return `503 Service Unavailable` with `delivery_not_configured`;
- no external email, CRM, or form-provider request is made;
- no success response is returned; and
- no payload is silently discarded.

The approved public contact address `info@expresscapital.ai` remains visible as a direct fallback. It does not imply that either web form delivered an inquiry.

The client must confirm:

- the preferred email, CRM, or WordPress form workflow;
- the final recipient address or CRM destination;
- the required sender identity; and
- the credentials or webhook configuration required by that workflow.

No form-delivery environment variables are defined until those decisions are made. Add one adapter behind the existing contract and only its required server-side configuration after approval. Never expose credentials through `NEXT_PUBLIC_` variables or commit them.

## CMS and launch limitations

- WordPress/Elementor is not connected to this Next.js frontend.
- Insights/blog is intentionally excluded from launch.
- FAQ content is maintained locally in `src/lib/faq-content.ts`.
- No CMS publishing workflow is included.
- The in-process rate limiter and idempotency store are per-instance; use durable infrastructure if the application is scaled across multiple server instances.
- There is no automated test suite; run the code checks and browser release audit before deployment.
- Image provenance and commercial-use rights remain to be confirmed by the client; see `docs/ASSET-LICENSING.md`.
- Visible contact information, testimonials, and publication consent should be confirmed by the client before launch.
