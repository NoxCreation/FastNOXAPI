"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./Controllers/auth"));
const users_1 = __importDefault(require("./Controllers/users"));
const posts_1 = __importDefault(require("./Controllers/posts"));
const categories_1 = __importDefault(require("./Controllers/categories"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
exports.SECRET_KEY = process.env.SECRET_KEY;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Usar las rutas del archivo de controladores
app.use(auth_1.default);
app.use(users_1.default);
app.use(posts_1.default);
app.use(categories_1.default);
(0, swagger_1.setupSwagger)(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
