import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '..';
import { UserType } from '../Types/UserType';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware para proteger rutas
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    let token = req.headers['authorization'] as string;
    if (!token) {
        res.status(403).send({ message: 'No token provided.' });
        return;
    }
    token = token.replace("Bearer ", "")

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            res.status(403).send({ message: 'Failed to authenticate token.' });
            return;
        }

        try {
            const decodedPayload = decoded as JwtPayload & UserType;

            const user = await prisma.user.findUnique({
                where: { id: decodedPayload.id },
            });

            if (!user) {
                res.status(403).send({ message: 'Failed to authenticate token.' });
                return;
            }

            (req as any).userId = decodedPayload.id;
            next();
        } catch (error) {
            res.status(403).send({ message: 'Failed to authenticate token.' });
        }
    });
};

export default verifyToken;
