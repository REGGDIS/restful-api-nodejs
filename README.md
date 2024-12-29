# API RESTful con Node.js y Express

Este proyecto es una API RESTful desarrollada utilizando Node.js y Express. Su propósito es servir como un ejemplo práctico para demostrar habilidades en el desarrollo de aplicaciones backend, incluyendo la implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Características principales

- **Operaciones CRUD completas** para gestionar una lista de usuarios almacenados en un archivo JSON.
- Estructura modular del proyecto, separando responsabilidades en controladores y rutas.
- Buenas prácticas en la gestión de errores y validación de datos.

## Tecnologías utilizadas

- Node.js
- Express
- Thunder Client (para pruebas de API)

## Estructura del proyecto

```
project-root/
├── controllers/
│   └── userController.js
├── routes/
│   └── users.js
├── data.json
├── index.js
└── README.md
```

- **`controllers/userController.js`**: Contiene la lógica de negocio para manejar usuarios.
- **`routes/users.js`**: Define las rutas de la API relacionadas con los usuarios.
- **`data.json`**: Archivo de datos donde se almacenan los usuarios.
- **`index.js`**: Punto de entrada principal que configura y arranca el servidor.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd restful-api-nodejs
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor:

   ```bash
   npm start
   ```

4. La API estará disponible en `http://localhost:3000`.

## Uso

### Endpoints

- **GET `/users`**: Obtiene todos los usuarios.
- **GET `/users/:id`**: Obtiene un usuario por su ID.
- **POST `/users`**: Crea un nuevo usuario. Requiere `name` y `email` en el cuerpo de la solicitud.
- **PUT `/users/:id`**: Actualiza un usuario por su ID. Requiere `name` y/o `email` en el cuerpo de la solicitud.
- **DELETE `/users/:id`**: Elimina un usuario por su ID.

### Ejemplo de solicitud

#### Crear un usuario (POST `/users`)

Cuerpo de la solicitud:

```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com"
}
```

Respuesta:

```json
{
  "message": "Usuario creado",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@example.com"
  }
}
```

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Notas importantes

1. **Gestión de datos sensibles**: Este repositorio no contiene claves API, contraseñas u otra información sensible.
2. **Pruebas**: Se recomienda usar herramientas como Thunder Client, Postman o cURL para probar la API.
3. **Despliegue**: Para compartir este proyecto con posibles contratadores, considera desplegarlo en plataformas gratuitas como Heroku, Render o Vercel.

---

¡Gracias por revisar este proyecto! Si tienes comentarios o preguntas, no dudes en contactarme.
