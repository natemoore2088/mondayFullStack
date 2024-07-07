import { Request, Response, NextFunction } from 'express';


export const verifyApiKey = (req: Request, res: Response, next: NextFunction): void => {

    const API_KEY = process.env.API_KEY;
    const apiKey = req.header('X-API-Key');
    
    if (!apiKey || apiKey !== API_KEY) {
        res.status(401).json({ message: 'Invalid API key' });
        return;
    }

    next();
};