const express = require('express');
const app = express();

// Middleware para manejar JSON en las peticiones
app.use(express.json()); // Esto permite que el servidor reciba datos en formato JSON

const PORT = 3000;

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu API RESTful con Node.js y Express!');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    // Aquí deberíamos interactuar con la base de datos
    res.json([
        { id: 1, name: 'Juan', email: 'juan@ejemplo.com' },
        { id: 2, name: 'Ana', email: 'ana@ejemplo.com' }
    ]);
});

// Ruta para obtener un usuario específico por ID
app.get('/users/:id', (req, res) => {
    // Aquí deberíamos interactuar con la base de datos
    const userId = req.params.id;
    res.json({ id: userId, name: 'Juan', email: 'juan@ejemplo.com' });
});

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    // Aquí agregaríamos el nuevo usuario a la base de datos
    res.status(201).json({ message: 'Usuario creado', user: { name, email } });
});

// Ruta para actualizar un usuario
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;;
    const { name, email } = req.body;
    // Aquí actualizaríamos el usuario en la base de datos
    res.json({ message: `Usuario con ID ${userId} actualizado`, user: { name, email } });
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Aquí eliminaríamos el usuario de la base de datos
    res.json({ message: `Usuario con ID ${userId} eliminado` });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});