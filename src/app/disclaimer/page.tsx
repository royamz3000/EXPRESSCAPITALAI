import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  routeMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(routeMetadata.disclaimer);

const breadcrumbJsonLd = createBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Terms & Disclaimer", path: routeMetadata.disclaimer.path },
]);

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} id="disclaimer-breadcrumb-json-ld" />
      <main className="min-h-screen bg-[#f4efe4] px-4 py-12 text-[#221d17] sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb">
          <Link className="text-sm text-[#6f7354] transition hover:text-[#221d17]" href="/">
            ← Back home
          </Link>
          </nav>

        <h1 className="mt-12 font-display text-5xl font-normal leading-none text-[#221d17] sm:text-6xl">
          Terms &amp; Disclaimer
        </h1>
        <p className="mt-4 text-sm text-[#7a7163]">Last updated: June 23, 2025</p>

        <div className="mt-12 space-y-7 text-base leading-[1.75] text-[#4d473b]">
          <p>
            Please read this page carefully before using the Express Capital website or inquiring about our products. By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">1. Not a Loan - Nature of Our Products</h2>
            <p className="mt-4">
              Express Capital provides <strong>merchant cash advances (MCAs)</strong> and other alternative business funding products. A merchant cash advance is a purchase of a specified amount of your future receivables at a discount — it is <strong>not a loan</strong> and is not subject to state or federal lending laws that govern commercial loans. There is no fixed repayment term, no fixed interest rate, and no APR associated with an MCA. The factor rate and total payback amount will be disclosed in your funding agreement prior to execution.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">2. No Guarantee of Funding</h2>
            <p className="mt-4">
              Submission of an inquiry or application does not constitute an offer, commitment, or guarantee of funding. All applications are subject to underwriting review and approval at our sole discretion. We reserve the right to decline any application without obligation to provide a reason. Advertised funding amounts, factor rates, and advance terms are illustrative only and may not reflect the terms available to your specific business.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">3. Informational Purpose Only</h2>
            <p className="mt-4">
              The content on this website is provided for general informational purposes only. Nothing on this site constitutes financial, legal, tax, accounting, or investment advice. You should consult qualified professionals before making any financial decisions, including decisions about business funding. Express Capital makes no representations or warranties regarding the accuracy, completeness, or suitability of any information on this site for your particular circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">4. Use of Website</h2>
            <p className="mt-4">You agree to use this website only for lawful purposes and in a manner that does not:</p>
            <ul className="mt-4 list-disc space-y-3 pl-5">
              <li>Infringe the rights of any third party.</li>
              <li>Transmit any material that is false, misleading, defamatory, or fraudulent.</li>
              <li>Attempt to gain unauthorized access to any portion of the site or its related systems.</li>
              <li>Interfere with the normal operation of the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">5. Accuracy of Business Information</h2>
            <p className="mt-4">
              By submitting an inquiry or application, you represent and warrant that all information provided is true, accurate, current, and complete to the best of your knowledge. Providing false or misleading information in connection with a funding application may constitute fraud and can result in immediate termination of any funding relationship and referral to appropriate authorities.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">6. Third-Party Links</h2>
            <p className="mt-4">
              This website may contain links to third-party websites for convenience or reference. Express Capital does not endorse, control, or assume responsibility for the content, privacy practices, or availability of those sites. Accessing third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">7. Limitation of Liability</h2>
            <p className="mt-4">
              To the fullest extent permitted by applicable law, Express Capital, its officers, employees, agents, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of, or inability to use,this website or our services, even if we have been advised of the possibility of such damages.
            </p>
            <p className="mt-4">
              Our total liability to you for any claim arising out of or related to this website shall not exceed one hundred U.S. dollars ($100).
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">8. Intellectual Property</h2>
            <p className="mt-4">
              All content on this website — including text, graphics, logos, and software — is the property of Express Capital or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any site content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">9. Governing Law</h2>
            <p className="mt-4">
              These terms are governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in New York.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">10. Changes to These Terms</h2>
            <p className="mt-4">
              We reserve the right to update or modify these terms at any time. Changes take effect upon posting to this page. Your continued use of the website after any changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-normal text-[#221d17]">11. Contact Us</h2>
            <p className="mt-4">
              For questions about these terms, please contact us at:
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
