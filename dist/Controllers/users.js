"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const verifyAuth_1 = __importDefault(require("../Middleware/verifyAuth"));
const generateHash_1 = require("../Helpers/generateHash");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/users', verifyAuth_1.default, async (req, res) => {
    const { page, pageSize } = req.query;
    let _page = 0;
    let _pageSize = 10;
    if (page != undefined)
        _page = parseInt(page) - 1;
    if (pageSize != undefined)
        _pageSize = parseInt(pageSize);
    const users = await prisma.user.findMany({
        where: { isRemoved: false },
        orderBy: { createdAt: 'desc' },
        skip: _page * _pageSize,
        take: _pageSize,
        include: {
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
    const hashedPassword = await (0, generateHash_1.generateHash)(password);
    const user = await prisma.user.create({
        data: { email, name, username, password: hashedPassword },
    });
    res.json(user);
});
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.user.update({
        where: { id },
        data: { isRemoved: true },
    });
    res.json({ message: 'User marked as removed' });
});
exports.default = router;
