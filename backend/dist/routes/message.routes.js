"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagecontroller_1 = require("../controllers/messagecontroller");
const router = express_1.default.Router();
router.route('/getmessages/:conversationId').get(messagecontroller_1.getMessages);
router.route('/sendmessage/:id').post(messagecontroller_1.sendMessage);
router.route('/conversations/:id').get(messagecontroller_1.getconversations);
router.route('/lastmessage/:conversationId').get(messagecontroller_1.lastmessage);
router.route('/recieverId/:conversationId').get(messagecontroller_1.groupids);
exports.default = router;
//# sourceMappingURL=message.routes.js.map