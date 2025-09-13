"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = __importDefault(require("./middleware/error"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});
app.use((0, express_session_1.default)({
    secret: '2ub2bf9242hcbnubcwcwshbccianci',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
}));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const doctor_routes_1 = __importDefault(require("./routes/doctor.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
app.use('/api/v1', patient_routes_1.default);
app.use('/api/v1', user_routes_1.default);
app.use('/api/v1', doctor_routes_1.default);
app.use('/api/v1', message_routes_1.default);
app.use('/api/v1', notification_routes_1.default);
app.use('/api/v1', payment_routes_1.default);
app.use(error_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map