"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeroles = exports.isauthenticateuser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const errorhander_1 = __importDefault(require("../utils/errorhander"));
const isauthenticateuser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new errorhander_1.default("Please Login to access this resource", 401));
    }
    const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.user = await usermodel_1.default.findById(decodedData.id) || undefined;
    next();
};
exports.isauthenticateuser = isauthenticateuser;
const authorizeroles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errorhander_1.default("User not authenticated", 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new errorhander_1.default(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.authorizeroles = authorizeroles;
//# sourceMappingURL=auth.js.map