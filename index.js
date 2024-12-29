const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const PORT = 3000;

// Middleware para manejar JSON en las peticiones
app.use(express.json());

// Usar las rutas para manejar las peticiones relacionadas con los usuarios
app.use('/users', userRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a tu API RESTful con Node.js y Express!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});