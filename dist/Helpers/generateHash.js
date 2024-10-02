"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = checkPassword;
exports.generateHash = generateHash;
const argon2_1 = __importDefault(require("argon2"));
async function checkPassword(password, hashedPassword) {
    try {
        const match = await argon2_1.default.verify(hashedPassword, password);
        return match;
    }
    catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}
async function generateHash(password) {
    try {
        const hashedPassword = await argon2_1.default.hash(password);
        return hashedPassword;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}
