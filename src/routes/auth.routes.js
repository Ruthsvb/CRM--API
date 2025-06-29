const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta de login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // Usuario y contraseña fijos para la demo
  if (usuario === 'RSVB' && password === 'admin123') {
    // Generar token JWT
    const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

module.exports = router;