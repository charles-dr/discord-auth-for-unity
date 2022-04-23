import { TaxRuleItem } from '../types';
import { incomeTaxRule } from '../constants';

export function rounding(src: number, pos: number = 0): number {
  // The ATO have a crazy rule where values above 0.159 are rounded up.
  const threshold = 0.159;

  const exp = Math.pow(10, pos);
  const temp = src * exp;
  const fraction = temp - Math.floor(temp);
  return Math.floor(fraction > threshold ? temp + 1 : temp) / exp;
}

/**
 * @name getIncomeTaxe
 * @description get tax for the basic income.
 * @param { number } income amount of income($)
 * @return { number } returns the tax rate(%)
 */
export function getIncomeTax(income: number): number {
  income = Math.floor(income);
  return incomeTaxRule
    .filter((rule: TaxRuleItem) => rule.from <= income || rule.to <= income)
    .reduce((sum, rule) => sum + (Math.min(income, rule.to) - rule.from) * rule.rate / 100, 0);
}

/**
 * @name getMedicareTax
 * @description get tax for medicare levey surcharge
 * @param { number } income amount of income($)
 * @return { number } returns the medicare tax
 */
export function getMedicareTax(income: number): number {
  if (income <= 21336) {
    return 0;
  } else if (income > 21336 && income <= 26668) {
    return rounding((income - 21336) * 0.1, 2);
  } else {
    return rounding(income * 0.02, 2);
  }
}

/**
 * @name getSuperAnnuation
 * @description get the amount of superannuation.
 * @param { number } income the amount of income.
 * @return { number } the amount of supperannuation.
 */
export function getSuperannuation(income: number): number {
  return rounding(income * 0.095, 2);
}

export function estimateBaseSalary(postTaxSalary: number): number {
  let min = 0;
  let max = postTaxSalary * 5;

  let midPoint = Math.floor((min + max) / 2);
  let nIter = 0;
  while(max - min > 1) {
    const incomeTax = getIncomeTax(midPoint);
    const medicareTax = getMedicareTax(midPoint);
    const totalTax = rounding(incomeTax + medicareTax);
    const postTax = midPoint - totalTax;

    if (postTax > postTaxSalary) {
      max = midPoint;
    } else {
      min = midPoint;
    }
    midPoint = Math.floor((min + max) / 2);
  }
  return midPoint;
}
