import express, { Request, Response } from "express";
import { Validator } from 'node-input-validator';

import { ValidationError } from '../utils/errors';
import { __error } from '../utils/common';
import { reverseWords, sortWords } from "../utils/starndard";
import {
  estimateBaseSalary,
  getIncomeTax,
  getMedicareTax,
  getSuperannuation,
  rounding,
} from "../utils/tax";

const router = express.Router();

router.route("/reverse-words").get((req: Request, res: Response) => {
  const validator = new Validator(req.query, {
    sentence: "required|string|minLength:2",
  });
  return validator.check()
    .then(matched => {
      if (!matched) throw new ValidationError(validator.errors);
      return reverseWords(req.query.sentence as string);
    })
    .then((reversed) => res.status(200).json(reversed))
    .catch((error) => __error(res, error));
});

router.route("/sort-words").get((req: Request, res: Response) => {
  const validator = new Validator(req.query, {
    sentence: "required|string|minLength:2",
  });
  return validator.check()
    .then(matched => {
      if (!matched) throw new ValidationError(validator.errors);
      return sortWords(req.query.sentence as string);
    })
    .then((sorted) => res.status(200).json(sorted))
    .catch((error) => __error(res, error));
});

router.route("/calculate-after-tax-income").get((req: Request, res: Response) => {
  const validator = new Validator(req.query, {
    annualBaseSalary: "required|numeric",
  });
  const baseSalary = parseInt(req.query.annualBaseSalary as string, 10);
  return validator.check()
    .then(matched => {
      if (!matched) throw new ValidationError(validator.errors);
      return Promise.all([
        getIncomeTax(baseSalary),
        getMedicareTax(baseSalary),
        getSuperannuation(baseSalary),
      ]);
    })
    .then(([incomeTax, medicareTax, superannuation]: number[]) => {
      const totalTax = rounding(incomeTax + medicareTax);
      return res
        .status(200)
        .json({
          baseSalary,
          superannuation,
          taxes: {
            income: incomeTax,
            medicare: medicareTax,
            total: totalTax,
          },
          postTaxIncome: baseSalary - totalTax,
        });
    })
    .catch(error => __error(res, error));
});

router.route("/calculate-pre-tax-income-from-take-home").get((req: Request, res: Response) => {
  const validator = new Validator(req.query, {
    postTaxSalary: "required|numeric",
  });
  const postTaxSalary = parseInt(req.query.postTaxSalary as string, 10);
  return validator.check()
    .then(matched => {
      if (!matched) throw new ValidationError(validator.errors);
      return Promise.resolve(estimateBaseSalary(postTaxSalary));
    })
    .then((baseSalary) => {
      const incomeTax = getIncomeTax(baseSalary);
      const medicareTax = getMedicareTax(baseSalary);
      const superannuation = getSuperannuation(baseSalary);

      const totalTax = rounding(incomeTax + medicareTax);
      return res
        .status(200)
        .json({
          baseSalary,
          superannuation,
          taxes: {
            income: rounding(incomeTax),
            medicare: medicareTax,
            total: totalTax,
          },
          postTaxIncome: baseSalary - totalTax,
        });
    })
    .catch((error) => __error(res, error));
});

export default router;
