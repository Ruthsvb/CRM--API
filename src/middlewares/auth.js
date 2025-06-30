

// Se importa la librería para verificar tokens JWT
const jwt = require('jsonwebtoken');

// Este es un middleware que se ejecuta antes de las rutas protegidas
module.exports = (req, res, next) => {
  // Se obtiene el token del encabezado 'authorization' de la petición
  const token = req.headers['authorization'];

  // Si no hay token, el usuario no está autenticado
  if (!token) {
    return res.status(401).json({ 
      error: 'Acceso denegado',
      mensaje: 'Necesitas un token de autenticación'
    });
  }

  try {
    // Se verifica el token usando nuestra clave secreta
   
    const tokenSinBearer = token.replace('Bearer ', ''); 
    const usuarioVerificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
    
    // Se guarda la información del usuario en la petición para usarla en las rutas
    req.user = usuarioVerificado;
  
    next();
  } catch (error) {

    console.error('Error al verificar el token:', error);
    res.status(401).json({ 
      error: 'Token inválido',
      mensaje: 'Tu sesión ha expirado o el token no es válido'
    });
  }
};