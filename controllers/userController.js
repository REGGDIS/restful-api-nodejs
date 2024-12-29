const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data.json');

// Cargar usuarios desde el archivo JSON
function loadUsers() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        return [];
    }
}

// Guardar usuarios en el archivo JSON
function saveUsers(users) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al guardar los usuarios:', error);
    }
}

// Obtener todos los usuarios
function getUsers(req, res) {
    try {
        const users = loadUsers();
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}

// Obtener un usuario por ID
function getUserById(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const users = loadUsers();
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

// Crear un nuevo usuario
function createUser(req, res) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Nombre y correo son requeridos' });
        }

        const users = loadUsers();
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; // Generar ID único
        const newUser = { id: newId, name, email };

        users.push(newUser);
        saveUsers(users);

        res.status(201).json({
            message: 'Usuario creado',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}

// Actualizar un usuario
function updateUser(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const { name, email } = req.body;

        const users = loadUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (name) users[userIndex].name = name;
        if (email) users[userIndex].email = email;
        saveUsers(users);

        res.json({ message: `Usuario con ID ${userId} actualizado`, user: users[userIndex] });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}

// Eliminar un usuario
function deleteUser(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const users = loadUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const deletedUser = users.splice(userIndex, 1);
        saveUsers(users);

        res.json({ message: `Usuario con ID ${userId} eliminado`, user: deletedUser[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };