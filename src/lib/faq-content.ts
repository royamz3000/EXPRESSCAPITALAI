export type FaqCategory =
  | "getting-started"
  | "eligibility"
  | "documents-underwriting"
  | "terms-funding"
  | "repayment"
  | "existing-applications";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: ReadonlyArray<{
  id: FaqCategory;
  label: string;
}> = [
  { id: "getting-started", label: "Getting started" },
  { id: "eligibility", label: "Eligibility" },
  {
    id: "documents-underwriting",
    label: "Documents and underwriting",
  },
  { id: "terms-funding", label: "Terms and funding" },
  { id: "repayment", label: "Repayment" },
  { id: "existing-applications", label: "Existing applications" },
];

export const faqItems: ReadonlyArray<FaqItem> = [
  {
    id: "request-business-funding",
    category: "getting-started",
    question: "How do I request business funding?",
    answer:
      "Complete the request form with the essentials about the business, the intended use of funds, and your timing. The information provided gives the team a starting point for review.",
  },
  {
    id: "after-submitting-request",
    category: "getting-started",
    question: "What happens after I submit a request?",
    answer:
      "The team reviews the information provided and may request supporting documents or additional context. If an available structure fits the business, you will have an opportunity to review the terms directly.",
  },
  {
    id: "request-not-a-commitment",
    category: "getting-started",
    question: "Is submitting a request a commitment to accept funding?",
    answer:
      "No. Submitting a request begins the review process. You can review any available structure and its terms before deciding whether to move forward.",
  },
  {
    id: "businesses-we-work-with",
    category: "eligibility",
    question: "What types of businesses does Express Capital work with?",
    answer:
      "Express Capital works with established operators across a range of industries. Fit depends on the business, its operating history, cash flow, and the opportunity the capital is intended to support.",
  },
  {
    id: "review-factors",
    category: "eligibility",
    question: "What factors may be considered during review?",
    answer:
      "Review may consider cash flow, operating history, the intended use of funds, timing, and the broader business picture. The information considered can vary depending on the business.",
  },
  {
    id: "approval-not-guaranteed",
    category: "eligibility",
    question: "Does submitting a request guarantee approval?",
    answer:
      "No. Every request is subject to review, and submitting information does not guarantee approval or that a particular funding structure will be available.",
  },
  {
    id: "documents-needed",
    category: "documents-underwriting",
    question: "What documents may be requested?",
    answer:
      "Recent business bank statements are commonly requested. Depending on the business and the request, the team may also ask for documents that clarify the operation, ownership, or intended use of funds.",
  },
  {
    id: "bank-statement-review",
    category: "documents-underwriting",
    question: "Why are business bank statements reviewed?",
    answer:
      "Business bank statements help the underwriting team understand revenue patterns, cash flow, and how the operation moves through a typical period. They are considered alongside the other information provided.",
  },
  {
    id: "additional-information",
    category: "documents-underwriting",
    question: "Will additional information ever be requested?",
    answer:
      "It may be. If the team needs more context to evaluate the request or confirm details, an advisor will explain what is needed and why.",
  },
  {
    id: "funding-structure",
    category: "terms-funding",
    question: "How are available funding structures determined?",
    answer:
      "Any available structure is informed by the business's cash flow, operating history, timing, intended use of funds, and the information reviewed during underwriting.",
  },
  {
    id: "review-terms",
    category: "terms-funding",
    question: "When will I be able to review the terms?",
    answer:
      "If a structure is available after review, the terms will be presented before you decide whether to proceed. Timing depends on the business and whether additional information is needed.",
  },
  {
    id: "fund-delivery",
    category: "terms-funding",
    question: "How are funds delivered after documents are completed?",
    answer:
      "After the required documents are completed and any remaining conditions are satisfied, funds are delivered directly to the business bank account provided for the transaction.",
  },
  {
    id: "repayment-details",
    category: "repayment",
    question: "Where can I find my repayment details?",
    answer:
      "The applicable repayment details are set out in your completed agreement and related documents. Review those materials for the terms specific to your funding structure.",
  },
  {
    id: "existing-agreement-question",
    category: "repayment",
    question: "Who should I contact with a question about an existing agreement?",
    answer:
      "Contact the Express Capital team and include the business name and enough information to identify the agreement. The team will direct the question to the appropriate person.",
  },
  {
    id: "existing-request-status",
    category: "existing-applications",
    question: "How can I check on an existing request?",
    answer:
      "Contact the team using the name, email address, and business name included with the request. Providing those details helps the team locate the submission.",
  },
  {
    id: "update-submitted-information",
    category: "existing-applications",
    question: "How do I update information after submitting?",
    answer:
      "Contact the team with the corrected information and identify the original request. An advisor can confirm whether anything further is needed for the review.",
  },
];
