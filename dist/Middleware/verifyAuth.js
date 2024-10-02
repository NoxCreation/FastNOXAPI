"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Middleware para proteger rutas
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(403).send({ message: 'No token provided.' });
        return;
    }
    jsonwebtoken_1.default.verify(token, __1.SECRET_KEY, async (err, decoded) => {
        if (err) {
            res.status(403).send({ message: 'Failed to authenticate token.' });
            return;
        }
        try {
            const decodedPayload = decoded;
            const user = await prisma.user.findUnique({
                where: { id: decodedPayload.id },
            });
            if (!user) {
                res.status(403).send({ message: 'Failed to authenticate token.' });
                return;
            }
            req.userId = decodedPayload.id;
            next();
        }
        catch (error) {
            res.status(403).send({ message: 'Failed to authenticate token.' });
        }
    });
};
exports.default = verifyToken;
