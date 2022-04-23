import { TaxRuleItem } from "../types";

export const incomeTaxRule: TaxRuleItem[] = [
  {
    from: 0,
    to: 18200,
    rate: 0,
  },
  {
    from: 18200,
    to: 37000,
    rate: 19,
  },
  {
    from: 37000,
    to: 87000,
    rate: 32.5,
  },
  {
    from: 87000,
    to: 180000,
    rate: 37,
  },
  {
    from: 180000,
    to: Infinity,
    rate: 45,
  },
];
