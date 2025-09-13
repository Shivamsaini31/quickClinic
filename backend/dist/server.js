"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./socket");
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config({ path: 'backend/config/config.env' });
(0, database_1.default)();
const server = http_1.default.createServer(app_1.default);
(0, socket_1.initializeSocket)(server);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
});
//# sourceMappingURL=server.js.map