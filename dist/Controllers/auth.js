"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const generateHash_1 = require("../Helpers/generateHash");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    if (!user)
        res.status(404).json({ message: 'User not found.' });
    const passwordIsValid = await (0, generateHash_1.checkPassword)(password, user?.password);
    if (!passwordIsValid)
        res.status(401).json({ message: 'Invalid password.' });
    const userJWT = {
        ...user,
        expiresIn: 86400
    };
    const token = jsonwebtoken_1.default.sign(userJWT, __1.SECRET_KEY, { expiresIn: 86400 }); // 24 horas
    res.status(200).json({ token });
});
exports.default = router;
