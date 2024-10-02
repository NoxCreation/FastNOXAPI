import docUser from './doc_user.json';
import docPost from './doc_post.json';
import docAuth from './doc_auth.json'
import docCategory from './doc_categories.json'

// Toda la documentacion del Swagger va aca
export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "API Documentación",
        version: "1.0.0"
    },
    tags: [
        {
            name: "Autenticación",
            description: "Login del sistema"
        },
        {
            name: "Usuario",
            description: "Operaciones relacionadas con usuarios"
        },
        {
            name: "Publicaciones",
            description: "Operaciones relacionadas con publicaciones"
        },
        {
            name: "Categorias",
            description: "Categorias de una publicación"
        },
    ],
    paths: {
        ...docUser,
        ...docPost,
        ...docAuth,
        ...docCategory
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
}