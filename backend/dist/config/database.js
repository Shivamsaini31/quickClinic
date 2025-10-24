"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const dbUrl = process.env.DB_URL || process.env.MONGODB_URI;
        if (!dbUrl) {
            throw new Error("Database URL not found in environment variables");
        }
        await mongoose_1.default.connect(dbUrl);
        console.log("Connected to database successfully");
    }
    catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map