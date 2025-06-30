
//Controladores para manejar las operaciones CRUD de clientes

const { Cliente } = require('../models');

const { registrarAccion } = require('../../mongodb/controllers/historial.controller');


 // Crea uno o varios clientes nuevos
const crearCliente = async (req, res) => {
  try {
    const data = req.body;

    // Función para validar que un cliente tenga los campos obligatorios
    const validarCliente = (cliente) => {
      if (!cliente.nombre || !cliente.email) {
        throw new Error('El nombre y el email son obligatorios.');
      }
    };

    // Si recibimos un array de clientes
    if (Array.isArray(data)) {
      // Validamos cada cliente del array
      data.forEach(validarCliente);
      
      // Creamos todos los clientes de una vez (operación en lote)
      const nuevosClientes = await Cliente.bulkCreate(data);

      // Registramos una acción de auditoría por cada cliente creado
      await Promise.all(
        nuevosClientes.map((cliente) =>
          registrarAccion({
            tipo: "CREAR",
            descripcion: `Se creó el cliente: ${cliente.nombre}`,
            usuario: req.user?.usuario || 'sistema' 
          })
        )
      );

      // Devolvemos los clientes creados
      return res.status(201).json(nuevosClientes);
    }

    // Si solo es un cliente, lo validamos y creamos
    validarCliente(data);
    const nuevoCliente = await Cliente.create(data);

    // Registramos la acción 
    await registrarAccion({
      tipo: "CREAR",
      descripcion: `Se creó el cliente: ${nuevoCliente.nombre}`,
      usuario: req.user?.usuario || 'sistema'
    });

    // Devolvemos el cliente creado
    res.status(201).json(nuevoCliente);

  } catch (error) {
    // Si hay un error, respondemos con el mensaje de error
    res.status(500).json({
      error: 'Error al crear el/los cliente(s)',
      detalle: error.message,
    });
  }
};

/**
 * Obtiene todos los clientes de la base de datos
 * Ruta: GET /api/clientes
 */
const obtenerClientes = async (req, res) => {
  try {
    // Buscamos todos los clientes en la base de datos
    const clientes = await Cliente.findAll({
      order: [['createdAt', 'DESC']] 
    });
    
    // Devolvemos la lista de clientes
    res.json(clientes);
  } catch (error) {

    res.status(500).json({
      error: 'Error al obtener clientes',
      detalle: error.message,
    });
  }
};

/**
 * Actualiza un cliente existente por su ID
 * Ruta: PUT /api/clientes/:id
 */
const actualizarCliente = async (req, res) => {
  try {
    // Obtenemos el ID de los parámetros de la URL
    const { id } = req.params;

    // Actualizamos el cliente y obtenemos cuántas filas se actualizaron
    const [actualizado] = await Cliente.update(req.body, { 
      where: { id },
      returning: true, 
      individualHooks: true 
    });

    // Si se actualizó correctamente (actualizado = 1)
    if (actualizado) {
      // Obtenemos el cliente actualizado
      const clienteActualizado = await Cliente.findByPk(id);

      // Registramos la acción de auditoría
      await registrarAccion({
        tipo: "EDITAR",
        descripcion: `Se editó el cliente con ID: ${id} (${clienteActualizado.nombre})`,
        usuario: req.user?.usuario || 'sistema'
      });

      // Devolvemos el cliente actualizado
      res.json(clienteActualizado);
    } else {
      // Si no se encontró el cliente
      res.status(404).json({ 
        error: 'Cliente no encontrado',
        mensaje: `No existe un cliente con el ID: ${id}`
      });
    }

  } catch (error) {
    // Si hay un error, respondemos con el mensaje de error
    res.status(500).json({
      error: 'Error al actualizar cliente',
      detalle: error.message,
    });
  }
};

//Elimina un cliente por su ID

const eliminarCliente = async (req, res) => {
  try {
    // Obtenemos el ID de los parámetros de la URL
    const { id } = req.params;

    // Buscamos el cliente para obtener su nombre antes de eliminarlo
    const cliente = await Cliente.findByPk(id);
    
    if (!cliente) {
      return res.status(404).json({ 
        error: 'Cliente no encontrado',
        mensaje: `No existe un cliente con el ID: ${id}`
      });
    }

    // Guardamos el nombre para el registro de auditoría
    const nombreCliente = cliente.nombre;
    
    // Eliminamos el cliente
    await cliente.destroy();

    // Registramos la acción de auditoría
    await registrarAccion({
      tipo: "ELIMINAR",
      descripcion: `Se eliminó el cliente: ${nombreCliente} (ID: ${id})`,
      usuario: req.user?.usuario || 'sistema'
    });

    // Confirmamos que se eliminó correctamente
    res.json({ 
      mensaje: 'Cliente eliminado correctamente',
      cliente: { id, nombre: nombreCliente }
    });

  } catch (error) {
    // Si hay un error, respondemos con el mensaje de error
    res.status(500).json({
      error: 'Error al eliminar cliente',
      detalle: error.message,
    });
  }
};

// Exportamos todos los controladores para usarlos en las rutas
module.exports = {
  crearCliente,
  obtenerClientes,
  actualizarCliente,
  eliminarCliente
};
