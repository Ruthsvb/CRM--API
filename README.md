# CRM-API

API RESTful para un sistema de gestión de relaciones con clientes (CRM) desarrollada con Node.js, Express, PostgreSQL y MongoDB.

## 🚀 Características

- Autenticación JWT segura
- Gestión completa de clientes (CRUD)
- Registro de historial de acciones
- Base de datos relacional (PostgreSQL) para datos estructurados
- Base de datos NoSQL (MongoDB) para registros de historial
- Contenedorizada con Docker
- Documentación completa de la API

## 📋 Requisitos Previos

- Docker 20.10+ y Docker Compose 2.0+
- Node.js 16+ y npm 8+
- Git

## 🛠️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/CRM-API.git
   cd CRM-API
   ```

2. Crear y configurar el archivo `.env` (basado en `.env.example`):
   ```env
   # Puerto de la aplicación
   PORT=3000
   
   # Configuración de JWT
   JWT_SECRET=tu_clave_secreta_jwt
   
   # Configuración de PostgreSQL
   DB_HOST=postgres
   DB_PORT=5432
   DB_NAME=crm_db
   DB_USER=postgres
   DB_PASSWORD=postgres
   
   # Configuración de MongoDB
   MONGO_URI=mongodb://mongo:27017/crm_history
   ```

3. Iniciar los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. La API estará disponible en `http://localhost:3000`

## 🗂 Estructura del Proyecto

```
├── config/               # Archivos de configuración
│   └── config.js         # Configuración de la aplicación
├── src/
│   ├── middlewares/      # Middlewares personalizados
│   │   └── auth.js       # Middleware de autenticación
│   ├── mongodb/          # Configuración y modelos de MongoDB
│   │   ├── controllers/  # Controladores de MongoDB
│   │   └── models/       # Modelos de MongoDB
│   ├── postgres/         # Configuración y modelos de PostgreSQL
│   │   ├── config/       # Configuración de Sequelize
│   │   ├── migrations/   # Migraciones de la base de datos
│   │   ├── models/       # Modelos de Sequelize
│   │   └── seeders/      # Datos iniciales
│   ├── routes/           # Rutas de la API
│   └── utils/            # Utilidades y helpers
├── .env                  # Variables de entorno
├── .gitignore
├── app.js                # Configuración de Express
├── docker-compose.yml    # Configuración de Docker Compose
├── dockerfile           # Configuración de Docker
├── package.json
└── server.js            # Punto de entrada de la aplicación
```

## 🔐 Autenticación

La API utiliza JSON Web Tokens (JWT) para la autenticación. Incluye un usuario precargado:

- **Usuario:** admin
- **Contraseña:** admin123

### Iniciar Sesión

```bash
POST /api/auth/login
```

**Cuerpo de la petición:**

```json
{
  "usuario": "admin",
  "password": "admin123"
}
```

**Respuesta Exitosa (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI5MjM4NDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "usuario": {
    "id": 1,
    "usuario": "admin",
    "rol": "admin"
  }
}
```

**Errores Comunes:**

- **400 Bad Request**: Datos de inicio de sesión inválidos
- **401 Unauthorized**: Credenciales incorrectas
- **500 Internal Server Error**: Error en el servidor

Recibirás un token JWT que deberás incluir en el encabezado `Authorization` de las peticiones posteriores:

```
Authorization: Bearer <token>
```

## 📡 Endpoints

### Autenticación

- `POST /api/auth/login` - Iniciar sesión y obtener token JWT

### Clientes (Protegido)

#### Obtener todos los clientes
```http
GET /api/clientes
Authorization: Bearer <token>
```

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+123456789",
    "createdAt": "2025-06-29T15:30:00.000Z",
    "updatedAt": "2025-06-29T15:30:00.000Z"
  }
]
```

#### Crear un nuevo cliente
```http
POST /api/clientes
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "María López",
  "email": "maria@example.com",
  "telefono": "+987654321"
}
```

**Respuesta Exitosa (201 Created):**
```json
{
  "id": 2,
  "nombre": "María López",
  "email": "maria@example.com",
  "telefono": "+987654321",
  "updatedAt": "2025-06-29T16:45:00.000Z",
  "createdAt": "2025-06-29T16:45:00.000Z"
}
```

### Historial (Protegido)

#### Obtener historial de acciones
```http
GET /api/historial
Authorization: Bearer <token>
```

**Respuesta Exitosa (200 OK):**
```json
[
  {
    "_id": "60d5ec9cf2a8b425f8e3a9b1",
    "tipo": "CREAR",
    "descripcion": "Se creó un nuevo cliente: Juan Pérez",
    "usuario": "admin",
    "fecha": "2025-06-29T15:30:00.000Z"
  }
]
```

## 🧪 Ejemplos de Uso

### 1. Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"admin123"}'
```

### 2. Obtener todos los clientes

```bash
curl -X GET http://localhost:3000/api/clientes \
  -H "Authorization: Bearer <token_jwt>"
```

### 3. Crear un nuevo cliente

```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_jwt>" \
  -d '{"nombre":"Juan Pérez","email":"juan@example.com","telefono":"+123456789"}'
```

## 🐳 Docker y MongoDB

### Iniciar todos los servicios (incluyendo MongoDB)

```bash
docker-compose up --build
```

### Iniciar solo MongoDB

Si solo necesitas el servicio de MongoDB:

```bash
docker-compose up -d mongo
```

### Conectarse a MongoDB

Puedes conectarte a MongoDB de varias formas:

1. **Usando MongoDB Compass**:
   - **Opción 1 (recomendada para la mayoría de los casos)**:
     ```
     mongodb://localhost:27017/crm_history
     ```
   - **Opción 2 (si localhost no funciona)**:
     ```
     mongodb://192.168.100.70:27017/crm_history
     ```
   - **Nota**: Si usas la dirección IP, asegúrate de que el puerto 27017 esté accesible en tu red local.

2. **Usando la terminal**:
   ```bash
   # Acceder al shell de MongoDB dentro del contenedor
   docker exec -it crm-mongo mongosh crm_history
   ```

### Comandos útiles de MongoDB

```bash
# Ver logs de MongoDB
docker logs crm-mongo

# Detener MongoDB
docker stop crm-mongo

# Iniciar MongoDB (si está detenido)
docker start crm-mongo

# Reiniciar el servicio de MongoDB
docker-compose restart mongo
```

### Ver datos en MongoDB

Una vez dentro del shell de MongoDB (`mongosh`), puedes usar estos comandos:

```javascript
// Mostrar todas las bases de datos
show dbs

// Usar la base de datos crm_history
use crm_history

// Mostrar todas las colecciones
show collections

// Ver documentos en la colección historials
db.historials.find().pretty()
```

### Detener servicios

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f
```

## ⚙️ Variables de Entorno

El proyecto utiliza las siguientes variables de entorno. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto de la aplicación
PORT=3000

# Configuración de JWT
JWT_SECRET=tu_clave_secreta_jwt

# Configuración de PostgreSQL
DB_HOST=db
DB_PORT=5432
DB_NAME=crm_db
DB_USER=postgres
DB_PASSWORD=postgres

# Configuración de MongoDB
MONGO_URI=mongodb://mongo:27017/crm_history
```

**Importante:**
- No compartas el archivo `.env` en el repositorio (está en .gitignore)
- Para producción, usa variables de entorno seguras y no valores por defecto

## 🛠 Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Bases de Datos:** PostgreSQL, MongoDB
- **Autenticación:** JWT
- **Contenedores:** Docker, Docker Compose
- **ORM:** Sequelize (PostgreSQL), Mongoose (MongoDB)

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

Desarrollado con ❤️ por [Ruth Velasquez]
