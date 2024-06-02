import { Request, Response, NextFunction } from 'express';

class ErrorHandler {
    public handleErrors(err: any, req: Request, res: Response, next: NextFunction): void {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }

    public handleNotFound(req: Request, res: Response, next: NextFunction): void {
        res.status(404).send('Route not found');
    }

    public handleCustomError(res: Response, error: any, message: string): void {
        console.error(error);
        res.status(500).send(message);
    }
}

export default new ErrorHandler();
