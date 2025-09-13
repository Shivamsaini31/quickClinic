import { Request, Response, NextFunction } from 'express';
export interface ErrorResponse {
    success: boolean;
    message: string;
    error?: any;
}
declare const Errormiddleware: (err: any, req: Request, res: Response, next: NextFunction) => void;
export default Errormiddleware;
//# sourceMappingURL=error.d.ts.map