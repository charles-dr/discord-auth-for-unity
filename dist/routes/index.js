"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
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
router.route('/ping').get(function (req, res) {
    return res.send("Pong!");
});
exports.default = router;
