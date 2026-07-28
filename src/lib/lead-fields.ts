export const revenueRanges = [
  "$20K – $50K",
  "$50K – $150K",
  "$150K – $400K",
  "$400K +",
] as const;

export const yearsOperating = [
  "Under 1 year",
  "1 – 3 years",
  "3 – 7 years",
  "7 + years",
] as const;

export type LeadApplication = {
  businessName?: string;
  monthlyRevenue?: (typeof revenueRanges)[number];
  yearsOperating?: (typeof yearsOperating)[number];
  capitalSought: number;
  email: string;
  name: string;
  mobile: string;
  office?: string;
};
