const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario específico por ID
router.get('/:id', getUserById);

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para actualizar un usuario
router.put('/:id', updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', deleteUser);

module.exports = router;