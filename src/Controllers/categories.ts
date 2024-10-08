import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import verifyToken from '../Middleware/verifyAuth';

const prisma = new PrismaClient();
const router = Router();

// Rutas para publicaciones
router.get('/categories', verifyToken, async (req, res) => {
    const { page, pageSize } = req.query;
    let _page = 0
    let _pageSize = 10
    if (page != undefined) _page = parseInt(page as string) - 1
    if (pageSize != undefined) _pageSize = parseInt(pageSize as string)

    const categories = await prisma.category.findMany({
        where: { isRemoved: false },
        orderBy: { createdAt: 'desc' },
        skip: _page * _pageSize,
        take: _pageSize
    });
    const count = await prisma.category.aggregate({
        where: { isRemoved: false },
        _count: true,
    });

    res.json({
        data: categories,
        page: _page + 1,
        pageSize: _pageSize,
        count: count._count
    });
});

router.post('/categories', verifyToken, async (req, res) => {
    const { name } = req.body;
    try {
        const post = await prisma.category.create({
            data: { name },
        });
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: 'Error creating post' });
    }
});

router.delete('/posts/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    await prisma.post.update({
        where: { id },
        data: { isRemoved: true },
    });
    res.json({ message: 'Post marked as removed' });
});

router.put('/posts/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;

    try {
        const post = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                published
            },
        });
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: 'Error updating post' });
    }
});

export default router;
