import type { Metadata } from "next";

export const siteConfig = {
  name: "Express Capital",
  url: "https://www.expresscapital.ai",
  alternateHostname: "expresscapital.ai",
  locale: "en_US",
  language: "en-US",
  description:
    "Express Capital provides working capital and revenue-based financing for established operators, with direct underwriting and terms structured around revenue.",
  email: "info@expresscapital.ai",
  telephone: "+17868638066",
  logo: "/favicon.png",
  socialImage: {
    path: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: "Express Capital EC monogram on a warm ivory background",
  },
} as const;

export const routeMetadata = {
  home: {
    path: "/",
    title: "Working Capital for Established Businesses",
    description: siteConfig.description,
    changeFrequency: "monthly",
    priority: 1,
  },
  industries: {
    path: "/industries",
    title: "Working Capital by Industry",
    description:
      "Explore working capital for hospitality, retail, medical and med spas, service businesses, franchises, and construction businesses.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  about: {
    path: "/about",
    title: "About Express Capital",
    description:
      "Learn how Express Capital works directly with established operators to structure capital around the business and opportunity.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  contact: {
    path: "/contact",
    title: "Contact Express Capital",
    description:
      "Contact Express Capital about a general question, an existing request, a partnership, or a business funding opportunity.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  faq: {
    path: "/resources/faq",
    title: "Frequently Asked Questions",
    description:
      "Learn about the Express Capital request process, underwriting, documents, funding, repayment, and existing applications.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Read how Express Capital collects, uses, shares, safeguards, and retains information submitted through its website and funding inquiry process.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  disclaimer: {
    path: "/disclaimer",
    title: "Terms & Disclaimer",
    description:
      "Review the terms governing the Express Capital website and disclosures about merchant cash advances, underwriting, and commercial financing.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
} as const;

export const publicRoutes = Object.values(routeMetadata);

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

const indexableRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type PageMetadata = Pick<
  (typeof routeMetadata)[keyof typeof routeMetadata],
  "description" | "path" | "title"
>;

export function createPageMetadata({
  description,
  path,
  title,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(siteConfig.socialImage.path);
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: socialImage,
          width: siteConfig.socialImage.width,
          height: siteConfig.socialImage.height,
          alt: siteConfig.socialImage.alt,
          type: "image/png",
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [
        {
          url: socialImage,
          alt: siteConfig.socialImage.alt,
        },
      ],
    },
    robots: indexableRobots,
  };
}

export function createOrganizationAndWebsiteJsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: `${siteConfig.url}/`,
        description: siteConfig.description,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.logo),
          width: 380,
          height: 380,
        },
        image: absoluteUrl(siteConfig.socialImage.path),
        email: siteConfig.email,
        telephone: siteConfig.telephone,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: siteConfig.telephone,
          email: siteConfig.email,
          availableLanguage: "English",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "https://schema.org/Monday",
              "https://schema.org/Tuesday",
              "https://schema.org/Wednesday",
              "https://schema.org/Thursday",
              "https://schema.org/Friday",
            ],
            opens: "09:00",
            closes: "17:00",
          },
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteConfig.url}/`,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}

export function createBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createFaqJsonLd(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
