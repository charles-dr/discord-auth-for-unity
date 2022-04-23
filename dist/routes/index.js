"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var node_input_validator_1 = require("node-input-validator");
var errors_1 = require("../utils/errors");
var common_1 = require("../utils/common");
var starndard_1 = require("../utils/starndard");
var tax_1 = require("../utils/tax");
var router = express_1.default.Router();
router.route("/reverse-words").get(function (req, res) {
    var validator = new node_input_validator_1.Validator(req.query, {
        sentence: "required|string|minLength:2",
    });
    return validator.check()
        .then(function (matched) {
        if (!matched)
            throw new errors_1.ValidationError(validator.errors);
        return (0, starndard_1.reverseWords)(req.query.sentence);
    })
        .then(function (reversed) { return res.status(200).json(reversed); })
        .catch(function (error) { return (0, common_1.__error)(res, error); });
});
router.route("/sort-words").get(function (req, res) {
    var validator = new node_input_validator_1.Validator(req.query, {
        sentence: "required|string|minLength:2",
    });
    return validator.check()
        .then(function (matched) {
        if (!matched)
            throw new errors_1.ValidationError(validator.errors);
        return (0, starndard_1.sortWords)(req.query.sentence);
    })
        .then(function (sorted) { return res.status(200).json(sorted); })
        .catch(function (error) { return (0, common_1.__error)(res, error); });
});
router.route("/calculate-after-tax-income").get(function (req, res) {
    var validator = new node_input_validator_1.Validator(req.query, {
        annualBaseSalary: "required|numeric",
    });
    var baseSalary = parseInt(req.query.annualBaseSalary, 10);
    return validator.check()
        .then(function (matched) {
        if (!matched)
            throw new errors_1.ValidationError(validator.errors);
        return Promise.all([
            (0, tax_1.getIncomeTax)(baseSalary),
            (0, tax_1.getMedicareTax)(baseSalary),
            (0, tax_1.getSuperannuation)(baseSalary),
        ]);
    })
        .then(function (_a) {
        var incomeTax = _a[0], medicareTax = _a[1], superannuation = _a[2];
        var totalTax = (0, tax_1.rounding)(incomeTax + medicareTax);
        return res
            .status(200)
            .json({
            baseSalary: baseSalary,
            superannuation: superannuation,
            taxes: {
                income: incomeTax,
                medicare: medicareTax,
                total: totalTax,
            },
            postTaxIncome: baseSalary - totalTax,
        });
    })
        .catch(function (error) { return (0, common_1.__error)(res, error); });
});
router.route("/calculate-pre-tax-income-from-take-home").get(function (req, res) {
    var validator = new node_input_validator_1.Validator(req.query, {
        postTaxSalary: "required|numeric",
    });
    var postTaxSalary = parseInt(req.query.postTaxSalary, 10);
    return validator.check()
        .then(function (matched) {
        if (!matched)
            throw new errors_1.ValidationError(validator.errors);
        return Promise.resolve((0, tax_1.estimateBaseSalary)(postTaxSalary));
    })
        .then(function (baseSalary) {
        var incomeTax = (0, tax_1.getIncomeTax)(baseSalary);
        var medicareTax = (0, tax_1.getMedicareTax)(baseSalary);
        var superannuation = (0, tax_1.getSuperannuation)(baseSalary);
        var totalTax = (0, tax_1.rounding)(incomeTax + medicareTax);
        return res
            .status(200)
            .json({
            baseSalary: baseSalary,
            superannuation: superannuation,
            taxes: {
                income: (0, tax_1.rounding)(incomeTax),
                medicare: medicareTax,
                total: totalTax,
            },
            postTaxIncome: baseSalary - totalTax,
        });
    })
        .catch(function (error) { return (0, common_1.__error)(res, error); });
});
exports.default = router;
