import express from 'express';
import { payment, verifypayment } from '../controllers/payment';

const router = express.Router();

router.route('/payment').post(payment);
router.route('/payment/verify/:paymentId').get(verifypayment);

export default router;
