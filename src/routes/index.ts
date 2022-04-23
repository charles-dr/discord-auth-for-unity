import express, { Request, Response } from "express";
import { Validator } from 'node-input-validator';

import { ValidationError } from '../utils/errors';
import { __error } from '../utils/common';

const router = express.Router();

// router.route("/test").get((req: Request, res: Response) => {
//   const validator = new Validator(req.query, {
//     sentence: "required|string|minLength:2",
//   });
//   return validator.check()
//     .then(matched => {
//       if (!matched) throw new ValidationError(validator.errors);
//       return reverseWords(req.query.sentence as string);
//     })
//     .then((reversed) => res.status(200).json(reversed))
//     .catch((error) => __error(res, error));
// });

router.route('/ping').get((req: Request, res: Response) => {
  return res.send("Pong!");
})


export default router;
