import { Request, Response, NextFunction } from 'express';
import JwtService from '../services/JwtService';
import User from '../models/User';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded: any = JwtService.verify(token);
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

export default authMiddleware;
