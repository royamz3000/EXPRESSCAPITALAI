# Express Capital website

Production marketing website for Express Capital. The site explains the company’s working-capital and revenue-based-financing offering, presents supported industries, and collects initial capital requests.

The application uses the Next.js App Router and is designed for deployment as a Node.js application. It includes route-level metadata, canonical redirects, a sitemap, robots directives, a web manifest, and JSON-LD structured data.

## Technology

- Next.js 16.2 with the App Router
- React 19.2
- TypeScript 5
- Tailwind CSS 4
- Next.js Image and Font optimization
- ESLint 9 with the Next.js configuration

The exact dependency graph is recorded in `package-lock.json`; retain that lockfile and use npm for reproducible installs.

## Prerequisites

- Node.js 20.9 or newer
- npm 10 or newer
- Network access during installation and production builds so Next.js can retrieve the configured Google font

## Run the project

```bash
npm ci
npm run dev
```

Open the development address printed by Next.js.

Production validation and startup:

```bash
npm run check
npm run start
```

`npm run start` requires a successful `npm run build` first.

### Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run lint` | Run ESLint across the repository |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the optimized build |
| `npm run check` | Run lint, type-check, and production build |

There is currently no automated test suite. Before release, run `npm run check` and complete the browser checks under [Release checklist](#release-checklist).

## Environment variables

No production form-delivery provider is selected, so the repository does not define form-delivery environment variables. After the client confirms its workflow, add only the server-side variables required by the selected adapter. Real values belong in ignored `.env.local` for local testing and in the client-owned deployment service’s encrypted settings for preview and production.

Never prefix delivery credentials with `NEXT_PUBLIC_`. Do not create a browser-visible settings page for them. Redeploy or restart the application after changing server-side configuration.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Main marketing page and capital-request form |
| `/about` | Company approach and operating principles |
| `/contact` | General, existing-request, and partnership inquiries |
| `/industries` | Supported industries and use-of-capital details |
| `/resources/faq` | Launch FAQ and deep-linked answers |
| `/privacy` | Privacy policy |
| `/disclaimer` | Terms and commercial-finance disclaimer |

Framework-generated public resources include `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, app icons, the Open Graph image, and the custom not-found page. `/api/lead-request` and `/api/contact-inquiry` are non-indexable server endpoints, not public content pages.

## Project organization

| Location | Responsibility |
| --- | --- |
| `src/app/` | Routes, global styles, metadata files, icons, manifest, sitemap, robots rules, and the API endpoint |
| `src/components/home/` | Shared header, footer, homepage sections, form, and interaction components |
| `src/components/seo/` | Safe JSON-LD renderer |
| `src/content/home.ts` | Shared homepage and industry content, FAQs, navigation targets, contact details, and legal footer text |
| `src/lib/submission-*.ts`, `src/lib/lead-*.ts`, and `src/lib/contact-*.ts` | Shared submission handling, provider-neutral delivery boundary, and application/contact validation |
| `src/lib/seo.ts` | Brand, production URL, route metadata, contact schema, and JSON-LD helpers |
| `src/lib/fonts.ts` | Font configuration |
| `public/` | Production images used by the rendered site |

### Common maintenance tasks

- **Copy:** update the relevant route or `src/content/home.ts`. Preserve approved commercial-finance terminology and legal review.
- **Images:** replace the referenced file in `public/` or update its import/path. Keep dimensions and crop behavior in mind, preserve descriptive alt text, and run a production build.
- **Navigation:** update both desktop and mobile links in `src/components/home/site-header.tsx`; update footer legal links in `src/components/home/site-footer.tsx` when applicable.
- **Industries:** keep card summaries and detailed sections synchronized in `src/content/home.ts`. The `/industries` page is intentionally one substantive route with anchored sections.
- **Contact information:** update both `footerContent` in `src/content/home.ts` and `siteConfig` in `src/lib/seo.ts` so visible contact details and structured data remain aligned.
- **Production domain:** change `siteConfig.url` and `siteConfig.alternateHostname` in `src/lib/seo.ts`. Canonicals, social URLs, sitemap entries, structured data, and the apex-to-`www` redirect all derive from that configuration.

## Form delivery status

The application and contact forms submit JSON to `POST /api/lead-request` and `POST /api/contact-inquiry`. Both endpoints validate and protect submissions before reaching a provider-neutral delivery boundary in `src/lib/submission-delivery.ts`.

No production email, CRM, or form provider is selected. The boundary currently has no configured adapter, so valid submissions return `503 Service Unavailable` with `delivery_not_configured`. No outbound provider request occurs, no payload is silently discarded, and neither form can report a successful delivery.

Before live delivery can be enabled, the client must confirm:

- the preferred email, CRM, or WordPress form workflow;
- the final recipient address or CRM destination;
- the required sender identity, if applicable; and
- the credentials, webhook, or other provider configuration required by that workflow.

After those decisions are confirmed, implement one adapter behind the existing delivery contract and add only the provider-specific server-side variables it requires. Keep real values in ignored `.env.local` for local testing and in encrypted hosting settings for deployed environments. Never expose credentials with `NEXT_PUBLIC_` variables or commit them.

### Delivery and abuse controls

- Strict server-side type, length, email, phone, option, and capital-range validation.
- JSON-only requests limited to 12 KiB and explicit POST-only responses.
- Same-origin enforcement and an off-screen honeypot field.
- A basic per-IP limit of five attempts per 15 minutes. This in-process limit is intentionally simple; add a hosting-provider firewall or durable distributed limiter if the application is scaled across many server instances.
- One UUID idempotency key per attempt. The server prevents concurrent/local duplicates and passes the same key to the future delivery adapter.
- Separate validated Contact and capital-request payloads, including approved UTM and source-path data.
- The submit control remains disabled after confirmed delivery.

### Integration verification after provider selection

1. Connect the confirmed provider through `src/lib/submission-delivery.ts` without weakening the existing validation or protection pipeline.
2. Configure its secrets only in ignored local settings and encrypted hosting settings.
3. Submit clearly marked dummy Contact and capital-request payloads using `example.com` addresses and reserved `555` telephone numbers.
4. Confirm the browser shows success only after the adapter returns a durable provider receipt identifier.
5. Confirm each destination receives the expected structured data and that retry/idempotency behavior does not create duplicates.
6. Keep the forms unavailable to real users until the client confirms successful receipt.

The visible contact destination is `info@expresscapital.ai`, and the visible telephone number is `+1 (786) 863-8066`. The owner must confirm both before launch.

## Deployment and current hosting state

As audited on July 16, 2026:

- This checkout has no Git remote configured.
- It was locally linked to a Vercel project named `express-capital-ai-website`; the account-specific `.vercel` directory was removed and must not be committed.
- The public domain is not currently serving this Next.js repository. `www.expresscapital.ai` resolves to `express-capital-landing-page.onrender.com`, and the live response identifies a Render origin running an Express application.
- The apex currently resolves to `216.24.57.8` and `216.24.57.9`.
- Authoritative nameservers are `ns1.dns-parking.com` and `ns2.dns-parking.com`.

Re-check all DNS values immediately before a cutover; the records above document the audit, not a permanent desired configuration. Preserve unrelated MX and TXT records when changing web-host records.

### Deploy to the client-owned hosting service

1. Put the repository in a client-controlled Git provider organization and configure the Git remote.
2. Configure the client-owned Node.js hosting service to install with `npm ci`, build with `npm run build`, and start with `npm run start` on Node.js 20.9 or newer.
3. After the client confirms the delivery workflow, add only the selected adapter’s required server-side configuration to every environment that can accept submissions.
4. Deploy and validate the generated preview URL without adding it to metadata or code.
5. Attach both `expresscapital.ai` and `www.expresscapital.ai` to that client-owned service. Keep `https://www.expresscapital.ai` as the canonical hostname unless the owner approves a domain strategy change.
6. Use the exact DNS records supplied by the selected hosting service and update them at the account controlling the current nameservers.
7. Confirm TLS, the apex-to-`www` permanent redirect, all public routes, the form destination, and metadata before removing the old Render service.

### Connect or transfer the Vercel project

For a new client-owned Vercel project:

1. Create or transfer the Git repository into the client’s Git provider organization.
2. In the client’s Vercel team, choose **Add New → Project**, import the repository, and retain the detected Next.js framework settings.
3. Confirm install command `npm ci`, build command `npm run build`, and Node.js 20.9 or newer.
4. After the client confirms the delivery workflow, add only the selected adapter’s required server-side configuration in **Project Settings → Environment Variables** for every environment that can accept submissions.
5. Validate a preview deployment, then add both production hostnames in **Project Settings → Domains**.
6. Use the exact DNS records shown for that project in Vercel’s [custom-domain flow](https://vercel.com/docs/domains/set-up-custom-domain); do not copy generic record values from another project.
7. Run the release checklist before switching DNS or retiring Render.

If the existing Vercel project should be retained, its current owner must initiate Vercel’s [project transfer flow](https://vercel.com/docs/projects/transferring-projects) into the client’s team. After transfer, review domains, Git linkage, environment variables, integrations, deployment protection, and team access; account-scoped integrations may require reconnection. A developer can then run `vercel link` to create fresh local metadata. Vercel’s [Git documentation](https://vercel.com/docs/git) covers repository connections.

Neither option transfers the domain registrar, DNS account, Git ownership, any future form-delivery account, or the current Render service. Those remain separate owner-controlled resources.

### Keep or replace the current Render service

The current Render service is external to this repository. The owner of that account must decide whether to update it to run this Next.js project or retire it after a validated cutover to another client-owned hosting service. Render requires the custom domain to be attached to the intended service before DNS is changed; see Render’s [custom-domain documentation](https://render.com/docs/custom-domains).

No hosting ownership, domain transfer, DNS mutation, or service deletion is performed by this repository.

## External services and ownership

| Resource | Current repository state | Owner action |
| --- | --- | --- |
| Domain and DNS | Public records use `dns-parking.com` nameservers | Confirm registrar and DNS-account ownership; preserve mail-related records |
| Render | Current public site points to a Render service | Identify the account owner and decide whether/when to retire it |
| Vercel | A local project link existed, but no account or project IDs are committed | Import the repository into or transfer the existing project to the client’s Vercel team |
| Git hosting | No remote is configured in this checkout | Create or transfer a client-controlled repository and connect it to hosting |
| Form delivery | Protected submission endpoints and a provider-neutral adapter boundary are implemented; no production adapter or destination is selected | Confirm the client’s workflow, destination, sender identity, and required credentials or webhook configuration before enabling production submissions |
| Email and telephone | Business contact details are present in source and structured data | Confirm the mailbox and phone number are client controlled and monitored |
| Testimonials | Names, roles, company names, and quotations are visible marketing content | Confirm accuracy, publication consent, and any required releases before launch |
| Analytics/advertising | None configured | Decide whether any client-owned measurement platform is required |
| Fonts | Libre Caslon Display is obtained through Next.js/Google Fonts at build time and then self-hosted | Retain the font license record and ensure build-network access |
| Images and brand marks | Served locally from `public/` and `src/app/`; source/license records are not in Git | Confirm commercial-use rights and retain originals/releases outside the public repository |

See [docs/ASSET-LICENSING.md](docs/ASSET-LICENSING.md) for the asset and dependency licensing inventory.

## Security and repository hygiene

- Environment files, provider metadata, dependencies, build output, logs, editor settings, OS artifacts, key files, and local TypeScript caches are ignored.
- Only safe placeholder values belong in `.env.example`.
- The handoff audit found no committed environment files or recognized private-key/API-token patterns in the current tree or Git history.
- Applicant details must be handled server-side and minimized. Do not add request-body logging.
- Run a fresh secret scan before every public release or repository transfer.

## Release checklist

1. Run `npm ci` from a clean checkout.
2. Run `npm run check`.
3. Start the production server with `npm run start`.
4. Test `/`, `/industries`, `/privacy`, `/disclaimer`, and a missing route at mobile and desktop sizes.
5. Confirm keyboard navigation, focus states, mobile-menu open/close behavior, FAQ accordions, and reduced-motion behavior.
6. Before an adapter is connected, submit invalid and valid form states and verify validation errors, the unconfigured `503` state, retry guidance, and duplicate protection. After integration, also verify provider failure handling and actual destination receipt.
7. Check every internal link, local image, icon, and emitted font request for a successful response.
8. Inspect page source for canonical URLs, unique metadata, robots directives, Open Graph/Twitter tags, and valid JSON-LD.
9. Verify `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` use only the production canonical domain.
10. Confirm the client owns the Git host, deployment project, DNS/registrar access, contact destinations, and any newly configured provider accounts.
