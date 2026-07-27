import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  routeMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(routeMetadata.privacy);

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: routeMetadata.privacy.path },
]);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} id="privacy-breadcrumb-json-ld" />
      <main className="min-h-screen bg-[#f4efe4] px-4 py-12 text-[#221d17] sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb">
          <Link className="text-sm text-[#6f7354] transition hover:text-[#221d17]" href="/">
            ← Back home
          </Link>
          </nav>

        <h1 className="mt-12 font-display text-5xl font-normal leading-none text-[#221d17] sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#7a7163]">Last updated: June 23, 2025</p>

        <div className="mt-12 space-y-7 text-base leading-[1.75] text-[#4d473b]">
          <p>
            Express Capital (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of business owners and individuals who visit our website or inquire about our merchant cash advance and business funding products. This Privacy Policy explains what information we collect, how we use it, with whom we share it, and the choices available to you.
          </p>

          <p>
            By accessing this website or submitting an inquiry, you agree to the terms of this Privacy Policy.
          </p>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">1. Information We Collect</h2>
            <p className="mt-4">We may collect the following categories of information:</p>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7354]">Information You Provide Directly</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li><strong>Business information</strong>: business legal name, DBA, industry, time in business, monthly revenue, and funding needs.</li>
              <li><strong>Personal identifying information</strong>: name, email address, phone number, and, where required for underwriting, date of birth and Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN) of business owners or personal guarantors.</li>
              <li><strong>Financial information</strong>: bank statements, credit card processing statements, and other documents submitted as part of a funding application.</li>
              <li><strong>Communication data</strong>: messages, emails, or other correspondence you send to us.</li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#6f7354]">Information Collected Automatically</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li><strong>Usage data</strong>: pages visited, time on site, referring URL, browser type, operating system, and IP address.</li>
              <li><strong>Cookies and similar technologies</strong>: session cookies used for site functionality. We do not currently use advertising or tracking cookies. You can disable cookies in your browser settings, though some site features may be affected.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">2. How We Use Your Information</h2>
            <p className="mt-4">We use the information we collect to:</p>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>Evaluate and process inquiries and applications for merchant cash advances and other business funding products.</li>
              <li>Verify your identity and the identity of your business for underwriting and compliance purposes.</li>
              <li>Communicate with you about your inquiry, application, or funded position, including status updates and required documentation.</li>
              <li>Comply with applicable federal and state laws, including anti-money-laundering (AML) and Bank Secrecy Act (BSA) obligations.</li>
              <li>Improve and maintain this website and our services.</li>
              <li>Send you relevant information about our products and services (you may opt out at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">3. Sharing of Information</h2>
            <p className="mt-4">We do not sell your personal information. We may share your information with:</p>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li><strong>Funding partners and investors</strong>: third-party funders or syndication partners who participate in providing your advance. These parties are bound by confidentiality obligations.</li>
              <li><strong>Service providers</strong>: vendors who assist with credit analysis, identity verification, document management, communications, and IT infrastructure, acting on our behalf under data processing agreements.</li>
              <li><strong>Credit bureaus and data providers</strong>: to obtain business and personal credit reports as part of underwriting, where permitted by law.</li>
              <li><strong>Legal and regulatory authorities</strong>: when required by law, subpoena, court order, or to protect our legal rights.</li>
              <li><strong>Business transfers</strong>: in connection with a merger, acquisition, or sale of assets, with appropriate confidentiality protections.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">4. Data Retention</h2>
            <p className="mt-4">
              We retain personal and business information for as long as necessary to fulfill the purposes described in this policy, satisfy applicable legal and regulatory requirements (which may include multi-year record-keeping obligations), resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">5. Data Security</h2>
            <p className="mt-4">
              We implement reasonable administrative, technical, and physical safeguards to protect your information against unauthorized access, disclosure, alteration, or destruction. No method of transmission over the internet or electronic storage is 100% secure. If you believe your information has been compromised, please contact us immediately at <a className="text-[#6f7354] transition hover:text-[#221d17]" href="mailto:info@expresscapital.ai">info@expresscapital.ai</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">6. Your Rights and Choices</h2>
            <p className="mt-4">Depending on your state of residence, you may have the right to:</p>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>Request access to the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information, subject to legal retention obligations.</li>
              <li>Opt out of marketing communications at any time by replying &quot;unsubscribe&quot; or contacting us directly.</li>
            </ul>
            <p className="mt-4">
              California residents may have additional rights under the California Consumer Privacy Act (CCPA). To exercise any of these rights, contact us at <a className="text-[#6f7354] transition hover:text-[#221d17]" href="mailto:info@expresscapital.ai">info@expresscapital.ai</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">7. Third-Party Links</h2>
            <p className="mt-4">
              This website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">8. Children&apos;s Privacy</h2>
            <p className="mt-4">
              Our services are intended for business owners and are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">9. Changes to This Policy</h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website or services after changes are posted constitutes your acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">10. Contact Us</h2>
            <p className="mt-4">
              If you have questions or concerns about this Privacy Policy or how your information is handled, please contact us at:
              <br />
              <br />
              <strong>Express Capital</strong>
              <br />
              <a className="text-[#6f7354] transition hover:text-[#221d17]" href="mailto:info@expresscapital.ai">info@expresscapital.ai</a>
            </p>
          </section>
        </div>

        <footer aria-label="Legal" className="mt-16 flex items-center gap-3 border-t border-[rgba(49,42,32,0.14)] py-8 text-sm text-[#7a7163]">
          <Link className="transition hover:text-[#221d17]" href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link className="transition hover:text-[#221d17]" href="/disclaimer">Terms &amp; Disclaimer</Link>
        </footer>
        </article>
      </main>
    </>
  );
}
