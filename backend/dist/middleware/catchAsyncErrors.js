"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncErrors = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.default = catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.js.map