"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateBaseSalary = exports.getSuperannuation = exports.getMedicareTax = exports.getIncomeTax = exports.rounding = void 0;
var constants_1 = require("../constants");
function rounding(src, pos) {
    if (pos === void 0) { pos = 0; }
    // The ATO have a crazy rule where values above 0.159 are rounded up.
    var threshold = 0.159;
    var exp = Math.pow(10, pos);
    var temp = src * exp;
    var fraction = temp - Math.floor(temp);
    return Math.floor(fraction > threshold ? temp + 1 : temp) / exp;
}
exports.rounding = rounding;
/**
 * @name getIncomeTaxe
 * @description get tax for the basic income.
 * @param { number } income amount of income($)
 * @return { number } returns the tax rate(%)
 */
function getIncomeTax(income) {
    income = Math.floor(income);
    return constants_1.incomeTaxRule
        .filter(function (rule) { return rule.from <= income || rule.to <= income; })
        .reduce(function (sum, rule) { return sum + (Math.min(income, rule.to) - rule.from) * rule.rate / 100; }, 0);
}
exports.getIncomeTax = getIncomeTax;
/**
 * @name getMedicareTax
 * @description get tax for medicare levey surcharge
 * @param { number } income amount of income($)
 * @return { number } returns the medicare tax
 */
function getMedicareTax(income) {
    if (income <= 21336) {
        return 0;
    }
    else if (income > 21336 && income <= 26668) {
        return rounding((income - 21336) * 0.1, 2);
    }
    else {
        return rounding(income * 0.02, 2);
    }
}
exports.getMedicareTax = getMedicareTax;
/**
 * @name getSuperAnnuation
 * @description get the amount of superannuation.
 * @param { number } income the amount of income.
 * @return { number } the amount of supperannuation.
 */
function getSuperannuation(income) {
    return rounding(income * 0.095, 2);
}
exports.getSuperannuation = getSuperannuation;
function estimateBaseSalary(postTaxSalary) {
    var min = 0;
    var max = postTaxSalary * 5;
    var midPoint = Math.floor((min + max) / 2);
    var nIter = 0;
    while (max - min > 1) {
        var incomeTax = getIncomeTax(midPoint);
        var medicareTax = getMedicareTax(midPoint);
        var totalTax = rounding(incomeTax + medicareTax);
        var postTax = midPoint - totalTax;
        if (postTax > postTaxSalary) {
            max = midPoint;
        }
        else {
            min = midPoint;
        }
        midPoint = Math.floor((min + max) / 2);
    }
    return midPoint;
}
exports.estimateBaseSalary = estimateBaseSalary;
