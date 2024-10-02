import express from 'express';
import dotenv from 'dotenv';
import router_auth from './Controllers/auth';
import router_user from './Controllers/users';
import router_posts from './Controllers/posts';
import router_categories from './Controllers/categories';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './Doc';

dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY as string;

const app = express();
app.use(express.json());

// Usar las rutas del archivo de controladores
app.use(router_auth);
app.use(router_user);
app.use(router_posts);
app.use(router_categories);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        authAction: {
            bearerAuth: {
                name: "bearerAuth",
                schema: {
                    type: "http",
                    in: "header",
                    name: "Authorization",
                    description: "Enter your bearer token in the format **Bearer &lt;token>**",
                },
                value: "Bearer <JWT>"
            }
        }
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
