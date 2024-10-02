"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Rutas para publicaciones
router.get('/posts', async (req, res) => {
    const { page, pageSize } = req.query;
    let _page = 0;
    let _pageSize = 10;
    if (page != undefined)
        _page = parseInt(page) - 1;
    if (pageSize != undefined)
        _pageSize = parseInt(pageSize);
    const posts = await prisma.post.findMany({
        where: { isRemoved: false },
        orderBy: { createdAt: 'desc' },
        skip: _page * _pageSize,
        take: _pageSize,
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    });
    const count = await prisma.post.aggregate({
        where: { isRemoved: false },
        _count: true,
    });
    res.json({
        data: posts,
        page: _page + 1,
        pageSize: _pageSize,
        count: count._count
    });
});
router.post('/posts', async (req, res) => {
    const { title, content, authorId } = req.body;
    try {
        const post = await prisma.post.create({
            data: { title, content, authorId },
        });
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating post' });
    }
});
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.post.update({
        where: { id },
        data: { isRemoved: true },
    });
    res.json({ message: 'Post marked as removed' });
});
router.put('/posts/:id', async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating post' });
    }
});
// Asociar categoria a un post
router.post('/posts/:postId/categories/:categoryId', async (req, res) => {
    const { postId, categoryId } = req.params;
    try {
        const postCategory = await prisma.postCategory.create({
            data: {
                postId,
                categoryId,
            },
        });
        res.json(postCategory);
    }
    catch (error) {
        res.status(400).json({ error: 'Error associating category to post' });
    }
});
exports.default = router;
