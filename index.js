const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Ruta del archivo JSON donde se almacenan los usuarios
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware para manejar JSON en las peticiones
app.use(express.json()); // Esto permite que el servidor reciba datos en formato JSON

// Función para cargar usuarios desde el archivo JSON
function loadUsers() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        return [];
    }
}

// Función para guardar usuarios en el archivo JSON
function saveUsers(users) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al guardar los usuarios:', error);
    }
}

// Cargar los usuarios al iniciar el servidor
let users = loadUsers();

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
    saveUsers(users); // Guardar cambios en el archivo

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
    saveUsers(users); // Guardar cambios en el archivo

    // Devolvemos el usuario actualizado
    res.json({ message: `Usuario con ID ${userId} actualizado`, user: users[userIndex] });
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Convertimos el ID a número
    const userIndex = users.findIndex(u => u.id === userId); // Buscamos el índice del usuario

    // Verificamos si el usuario existe
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminamos el usuario del array
    const deletedUser = users.splice(userIndex, 1);
    saveUsers(users); // Guardar cambios en el archivo

    // Respondemos con un mensaje y el usuario eliminado
    res.json({ message: `Usuario con ID ${userId} eliminado`, user: deletedUser[0] });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});