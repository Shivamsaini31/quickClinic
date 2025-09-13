import { Request, Response, NextFunction } from 'express';
declare const catchAsyncErrors: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.d.ts.map