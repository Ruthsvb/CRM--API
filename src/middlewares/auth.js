// src/middlewares/auth.js
// Middleware de autenticación JWT

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtenemos el token del header Authorization
  const token = req.headers['authorization'];

  // Si no hay token, respondemos con error 401
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    // Verificamos y decodificamos el token usando la clave secreta
    // Quitamos el prefijo 'Bearer ' si existe
    req.user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Si todo está bien, continuamos con la siguiente función
    next();
  } catch {
    // Si el token es inválido o expiró, respondemos con error 401
    res.status(401).json({ error: 'Token inválido' });
  }
};