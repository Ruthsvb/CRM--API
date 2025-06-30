const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Ruta para el inicio de sesión
// POST /api/auth/login
// Espera un objeto JSON con { usuario, password }
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  console.log('Inicio de sesión intentado para:', usuario);

  if (usuario === 'RSVB' && password === 'admin123') {
    const token = jwt.sign(
      { usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return res.json({ 
      mensaje: '¡Bienvenido! Has iniciado sesión correctamente',
      token
    });
  }

  return res.status(401).json({ 
    error: 'Acceso denegado',
    mensaje: 'El usuario o la contraseña son incorrectos'
  });
});

module.exports = router;
