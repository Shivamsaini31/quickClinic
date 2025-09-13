"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = require("../controllers/payment");
const router = express_1.default.Router();
router.route('/payment').post(payment_1.payment);
router.route('/payment/verify/:paymentId').get(payment_1.verifypayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map