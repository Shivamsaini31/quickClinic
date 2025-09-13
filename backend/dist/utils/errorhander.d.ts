declare class ErrorHander extends Error {
    statusCode: number;
    success: boolean;
    constructor(message: string, statusCode: number);
}
export default ErrorHander;
//# sourceMappingURL=errorhander.d.ts.map