
// Importamos el modelo Cliente desde la base de datos PostgreSQL
const { Cliente } = require('../models');

// Importamos la función que registra acciones en MongoDB para auditoría
const { registrarAccion } = require('../../mongodb/controllers/historial.controller');

// Controlador para crear uno o varios clientes
const crearCliente = async (req, res) => {
  try {
    const data = req.body;

    // Validamos que cada cliente tenga nombre y email
    const validarCliente = (cliente) => {
      if (!cliente.nombre || !cliente.email) {
        throw new Error('El nombre y el email son obligatorios.');
      }
    };

    // Si recibimos un array, creamos múltiples clientes
    if (Array.isArray(data)) {
      data.forEach(validarCliente); // Validamos cada objeto
      const nuevosClientes = await Cliente.bulkCreate(data); // Guardamos en PostgreSQL

      // Registramos en MongoDB cada creación
      await Promise.all(
        nuevosClientes.map((cliente) =>
          registrarAccion({
            tipo: "CREAR",
            descripcion: `Se creó el cliente: ${cliente.nombre}`,
          })
        )
      );

      return res.status(201).json(nuevosClientes);
    }

    // Si es un solo cliente
    validarCliente(data); // Validamos
    const nuevoCliente = await Cliente.create(data); // Guardamos en PostgreSQL

    // Registramos la creación en el historial
    await registrarAccion({
      tipo: "CREAR",
      descripcion: `Se creó el cliente: ${nuevoCliente.nombre}`,
    });

    res.status(201).json(nuevoCliente);

  } catch (error) {
    // Capturamos cualquier error y lo devolvemos
    res.status(500).json({
      error: 'Error al crear el/los cliente(s)',
      detalle: error.message,
    });
  }
};

// Controlador para obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll(); // Consultamos todos los registros
    res.json(clientes); // Enviamos la respuesta
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener clientes',
      detalle: error.message,
    });
  }
};

// Controlador para actualizar un cliente por su ID
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Sequelize devuelve un array donde el primer valor indica si se actualizó
    const [actualizado] = await Cliente.update(req.body, { where: { id } });

    if (actualizado) {
      const clienteActualizado = await Cliente.findByPk(id); // Obtenemos el cliente actualizado

      // Registramos la edición en MongoDB
      await registrarAccion({
        tipo: "EDITAR",
        descripcion: `Se editó el cliente con ID: ${id}`,
      });

      res.json(clienteActualizado);
    } else {
      // Si no existe el cliente
      res.status(404).json({ error: 'Cliente no encontrado' });
    }

  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar cliente',
      detalle: error.message,
    });
  }
};

// Controlador para eliminar un cliente por su ID
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Intentamos eliminar el cliente
    const eliminado = await Cliente.destroy({ where: { id } });

    if (eliminado) {
      // Registramos la eliminación en el historial
      await registrarAccion({
        tipo: "ELIMINAR",
        descripcion: `Se eliminó el cliente con ID: ${id}`,
      });

      res.json({ mensaje: 'Cliente eliminado correctamente' });
    } else {
      // Si no se encontró el cliente
      res.status(404).json({ error: 'Cliente no encontrado' });
    }

  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar cliente',
      detalle: error.message,
    });
  }
};

// Exportamos todos los métodos del controlador
module.exports = {
  crearCliente,
  obtenerClientes,
  actualizarCliente,
  eliminarCliente
};
