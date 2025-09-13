import express from 'express';
import { getMessages, sendMessage, getconversations, lastmessage, groupids } from '../controllers/messagecontroller';

const router = express.Router();

router.route('/getmessages/:conversationId').get(getMessages);
router.route('/sendmessage/:id').post(sendMessage);
router.route('/conversations/:id').get(getconversations);
router.route('/lastmessage/:conversationId').get(lastmessage);
router.route('/recieverId/:conversationId').get(groupids);

export default router;
