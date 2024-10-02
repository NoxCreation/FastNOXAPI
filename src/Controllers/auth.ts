import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '..';
import { checkPassword } from '../Helpers/generateHash';

const prisma = new PrismaClient();
const router = Router();

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if (!user) res.status(404).json({ message: 'User not found.' });

    const passwordIsValid = await checkPassword(password, user?.password as string);
    if (!passwordIsValid) res.status(401).json({ message: 'Invalid password.' });

    const userJWT = {
        ...user,
        expiresIn: 86400
    }
    const token = jwt.sign(userJWT, SECRET_KEY, { expiresIn: 86400 }); // 24 horas
    res.status(200).json({ token });
});

export default router;
