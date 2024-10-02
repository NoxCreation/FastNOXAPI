# API FAST NOX

Este repositorio de NOX Creation, posee una primera versión de un modelo para construir API de forma rápida. Con esta podrás servir varias endpoints, enlazar con varios modelos de bases de datos y documentar la API en Swagguer.

Para ello es importante clonar este repositorio en su máquina:

    git clone 

## Qué puede hacer con FastNOXAPI

Este repositorio constituye un molder para crear API de forma más rápida, no es un framework ni una library en específico. 

Se deben seguir estos pasos para poder utilizarlo:

- Clonar el repositorio
- Instalar las dependencias
- Crear el .env con sus datos de conexión a BD (postgres en el ejemplo)
- Crear la BD (apitest en el ejemplo)
- Realizar la migración
- Correr el servidor

## Instalar dependencias

Utilice su gestor de dependencias favorito, acá utilizaremos a Yarn

    yarn

Las principales dependencias son:

* [Prisma](https://www.prisma.io/): ORM que enlazará la API con diferentes bases de datos como Postgres, MongoDB etc .... También se explota su capacidad para hacer migraciones de forma sencilla.

* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): Va a facilitar la obtención de tokens de autenticación JWT (JSON Web Token) para los casos de autenticación y acceso a los recursos API.

* [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc): Posibilitará poder documentar la API en Swagger de forma sencilla.

## Estructura del proyecto

El proyecto está formado por la siguiente estructura:

![alt text](/images/image1.jpg)

* *Controllers*: Los controladores son todas las rutas del endpoint. En el caso del repositorio ya vienen unas rutas de ejemplo para hacer un CRUD con Usuarios, Publicaciones y Categorias.

* *Middleware*: Los Middleware son un conjunto de funciones que validan los accesos a los endpoint antes de entrar y ejecutarlos. Acá viene con uno por defecto que comprueba el token JWT y valida al usuario.

* *Docs*: Posee un grupo de JSON que corresponde a toda la documentación de los endpoints en el Swagger.

* *Types*: Es el tipado de cada dato ya que el código está escrito en TypeScript.

## Enviroment

Cree el archivo .env con sus datos de conexión, sírvace del archivo .env.example para tener un ejemplo.

## Creación de migraciones

    yarn migrate --name [name_migration]

## Ejecución del servidor

    yarn start

## Colaboración

Si desea colaborar expandiendo el proyecto por favor de escribirnos vía correo

[services@noxcreation.dev](mailto:services@noxcreation.dev)