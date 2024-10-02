import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import verifyToken from '../Middleware/verifyAuth';
import { generateHash } from '../Helpers/generateHash';

const prisma = new PrismaClient();
const router = Router();

router.get('/users', verifyToken, async (req, res) => {
    const { page, pageSize } = req.query;
    let _page = 0
    let _pageSize = 10
    if (page != undefined) _page = parseInt(page as string) - 1
    if (pageSize != undefined) _pageSize = parseInt(pageSize as string)

    const users = await prisma.user.findMany({
        where: { isRemoved: false },
        orderBy: { createdAt: 'desc' },
        skip: _page * _pageSize,
        take: _pageSize,
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            posts: {
                where: { isRemoved: false },
                include: {
                    categories: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        }
    });
    const count = await prisma.user.aggregate({
        where: { isRemoved: false },
        _count: true,
    });

    res.json({
        data: users,
        page: _page + 1,
        pageSize: _pageSize,
        count: count._count
    });
});

router.post('/users', async (req, res) => {
    const { email, name, username, password } = req.body;
    const hashedPassword = await generateHash(password);
    const user = await prisma.user.create({
        data: { email, name, username, password: hashedPassword },
    });
    res.json(user);
});

router.delete('/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    await prisma.user.update({
        where: { id },
        data: { isRemoved: true },
    });
    res.json({ message: 'User marked as removed' });
});

router.put('/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { email, name, username } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                email,
                name,
                username
            },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error updating post' });
    }
});


export default router;
