const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON en las peticiones
app.use(express.json()); // Esto permite que el servidor reciba datos en formato JSON

// Lista de usuarios en memoria
let users = [];

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu API RESTful con Node.js y Express!');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    // Aquí deberíamos interactuar con la base de datos
    res.json(users);
});

// Ruta para obtener un usuario específico por ID
app.get('/users/:id', (req, res) => {
    // Aquí deberíamos interactuar con la base de datos
    const userId = parseInt(req.params.id); // Obtenemos el ID del usuario de la URL

    // Buscar el usuario con el ID proporcionado en la lista de usuarios
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si el usuario existe, lo devolvemos
    res.json(user);
});

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    // Validación simple
    if (!name || !email) {
        return res.status(400).json({ message: 'Nombre y correo son requeridos' });
    }

    // Crear un nuevo usuario con un id único
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    // Responder con el usuario creado
    res.status(201).json({
        message: 'Usuario creado',
        user: newUser
    });
});

// Ruta para actualizar un usuario
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convertimos el ID a número
    const { name, email } = req.body;

    // Encontramos el índice del usuario en el array
    const userIndex = users.findIndex(u => u.id === userId);

    // Si el usuario no existe, devolvemos un error 404
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizamos los datos del usuario
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    // Devolvemos el usuario actualizado
    res.json({ message: `Usuario con ID ${userId} actualizado`, user: users[userIndex] });
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