# Quiero Mi Beca 🎓

Aplicación web que centraliza información sobre becas y oportunidades de formación en Chile, alineada con el ODS 10 (Reducción de desigualdades) de las Naciones Unidas.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)
![Express](https://img.shields.io/badge/express-5.x-lightgrey.svg)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)
- [Equipo](#-equipo)
- [Licencia](#-licencia)

---

## 🎯 Descripción del Proyecto

**Quiero Mi Beca** es una plataforma web desarrollada como proyecto educativo que tiene como objetivo democratizar el acceso a información sobre becas, carreras e instituciones educativas en Chile. La aplicación busca reducir la brecha informativa que enfrentan estudiantes de distintos contextos socioeconómicos al buscar oportunidades de formación.

### Problema que Resuelve

- **Fragmentación de información**: Las becas y beneficios están dispersos en múltiples sitios web
- **Dificultad de acceso**: No todos los estudiantes tienen el conocimiento o recursos para encontrar oportunidades
- **Falta de centralización**: No existe una plataforma única que agrupe instituciones, carreras y becas

### Alineación con ODS 10

Este proyecto contribuye directamente al cumplimiento del **Objetivo de Desarrollo Sostenible 10: Reducción de las Desigualdades**, específicamente:
- Meta 10.2: Promover la inclusión social, económica y política
- Meta 10.3: Garantizar la igualdad de oportunidades

---

## ✨ Características Principales

### Para Estudiantes

- 🔍 **Búsqueda Unificada**: Encuentra becas, carreras e instituciones en un solo lugar
- 📊 **Comparación**: Visualiza información clave como empleabilidad, salario promedio y requisitos
- ⭐ **Sistema de Valoración**: Lee y deja reseñas sobre instituciones educativas
- 💾 **Favoritos**: Guarda y organiza tus opciones preferidas
- 🔔 **Recordatorios**: Recibe notificaciones sobre fechas de postulación (funcionalidad futura)

### Para Instituciones

- 📝 **Perfiles Detallados**: Muestra información completa sobre programas, requisitos y beneficios
- 📈 **Estadísticas**: Visualiza puntuaciones y opiniones de usuarios
- 🔗 **Enlaces Directos**: Redirige a postulaciones oficiales

### Técnicas

- 🔐 **Autenticación JWT**: Sistema seguro de login y registro
- 📱 **Diseño Responsive**: Funciona en dispositivos móviles, tablets y desktop
- 🚀 **Paginación Eficiente**: Carga rápida de grandes volúmenes de datos
- 🎨 **Interfaz Intuitiva**: Diseño limpio basado en Bootstrap 5

---

## 🛠️ Tecnologías Utilizadas

### Frontend

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.12.2",
  "bootstrap": "^5.x",
  "vite": "^5.x"
}
```

### Backend

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.1",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "morgan": "^1.10.1"
}
```

### Base de Datos

- **MongoDB Atlas**: Base de datos NoSQL en la nube
- **Mongoose**: ODM para modelado de datos

---

## 📁 Estructura del Proyecto

```
quiero-mi-beca/
├── Backend/
│   ├── index.js                    # Punto de entrada del servidor
│   ├── package.json
│   └── src/
│       ├── App/
│       │   └── App.js              # Configuración de Express
│       ├── Controllers/            # Lógica de negocio
│       │   ├── Becas.controllers.js
│       │   ├── Carreras.controllers.js
│       │   ├── Insti.controllers.js
│       │   └── User.controllers.js
│       ├── Models/                 # Esquemas de Mongoose
│       │   ├── BecasModel.js
│       │   ├── CarrerasModel.js
│       │   ├── InstitucionModel.js
│       │   └── UserModel.js
│       ├── Routes/
│       │   └── Routes.js           # Definición de rutas API
│       ├── Middlewares/
│       │   └── requireAuth.js      # Autenticación JWT
│       └── Data/
│           └── conexion.js         # Conexión a MongoDB
│
├── React/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                # Punto de entrada React
│       ├── App.jsx                 # Componente raíz
│       ├── Components/             # Componentes organizados por funcionalidad
│       │   ├── Home.comps/         # Página principal
│       │   ├── Nav.comps/          # Barra de navegación
│       │   ├── Foot.comps/         # Footer
│       │   ├── Login.comps/        # Login y Registro
│       │   ├── Insti.comps/        # Vista de instituciones
│       │   ├── Becas.comps/        # Catálogo de becas
│       │   ├── Carreras.comps/     # Detalle de carreras
│       │   ├── Perfi.User.comps/   # Perfil de usuario
│       │   └── Perfi.insti.comps/  # Perfil de institución
│       ├── api/                    # Servicios HTTP
│       │   ├── client.js           # Configuración Axios
│       │   ├── becas.js
│       │   ├── carreras.js
│       │   ├── instituciones.js
│       │   ├── catalogoPrevio.js
│       │   └── profile.js
│       └── assets/                 # Imágenes y recursos estáticos
│
└── README.md
```

---

## 🚀 Instalación

### Prerrequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cuenta gratuita
- [Git](https://git-scm.com/)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/quiero-mi-beca.git
cd quiero-mi-beca
```

### Paso 2: Instalar Dependencias del Backend

```bash
cd Backend
npm install
```

### Paso 3: Instalar Dependencias del Frontend

```bash
cd ../React
npm install
```

---

## ⚙️ Configuración

### Backend

Crea un archivo `.env` en la carpeta `Backend/`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/quieromibeca?retryWrites=true&w=majority

# Servidor
PORT=3000

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=7d

# Bcrypt
BCRYPT_COST=12

# Entorno
NODE_ENV=development
```

#### Obtener MONGODB_URI

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. En "Database Access", crea un usuario
4. En "Network Access", permite tu IP (o `0.0.0.0/0` para desarrollo)
5. Haz clic en "Connect" > "Connect your application" y copia la URI

### Frontend

Crea un archivo `.env` en la carpeta `React/`:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 💻 Uso

### Modo Desarrollo

#### Terminal 1 - Backend

```bash
cd Backend
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

#### Terminal 2 - Frontend

```bash
cd React
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo Producción

#### Backend

```bash
cd Backend
npm start
```

#### Frontend

```bash
cd React
npm run build
# Los archivos compilados estarán en React/dist/
```

### Usuarios de Prueba

Puedes crear tu propia cuenta o usar credenciales de prueba (si están configuradas en tu BD).

---

## 🔌 API Endpoints

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/registro` | Crear nueva cuenta | ❌ |
| POST | `/api/login` | Iniciar sesión | ❌ |
| GET | `/api/me` | Obtener usuario actual | ✅ |
| PUT | `/api/me` | Actualizar perfil | ✅ |

### Instituciones

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/institucionesPrevias` | Listar todas (preview) | ❌ |
| GET | `/api/instituciones/:id` | Detalle de institución | ❌ |
| POST | `/api/instituciones/:id/updateOpinion` | Calificar institución | ❌ |

### Becas

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/becas` | Listar becas (con filtros) | ❌ |
| GET | `/api/becas/:id` | Detalle de beca | ❌ |

### Carreras

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/carreras` | Listar carreras | ❌ |
| GET | `/api/carreras/:id` | Detalle de carrera | ❌ |

### Ejemplos de Uso

#### Buscar Becas Activas

```bash
GET /api/becas?activa=true
```

#### Filtrar por Institución

```bash
GET /api/becas?institutionId=507f1f77bcf86cd799439011
```

#### Buscar por Área

```bash
GET /api/becas?area=Educación%20Superior
```

---

## 🎨 Capturas de Pantalla

### Página Principal
![Home](docs/screenshots/home.png)

### Catálogo de Becas
![Becas](docs/screenshots/becas.png)

### Perfil de Institución
![Institución](docs/screenshots/institucion.png)

---

## 🧪 Testing (Futuro)

Actualmente el proyecto no tiene tests implementados. Se recomienda agregar:

```bash
# Frontend
npm test

# Backend
npm test
```

---

## 🤝 Contribuir

Este es un proyecto educativo, pero las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo

- **Commits**: Usa prefijos como `Add:`, `Fix:`, `Update:`, `Remove:`
- **Código**: Sigue las convenciones de ESLint (configurar en futuro)
- **Componentes**: Usa PascalCase para nombres de archivos
- **Variables**: Usa camelCase

---

## 👥 Equipo

Proyecto desarrollado como parte de un curso de desarrollo Full Stack:

- **Desarrollador Backend**: [Nombre]
- **Desarrollador Frontend**: [Nombre]
- **Integración Full Stack**: [Nombre]

---

## 📝 Notas de Aprendizaje

### Conceptos Clave Aplicados

1. **Arquitectura REST**: Separación cliente-servidor con API RESTful
2. **Autenticación JWT**: Tokens para sesiones seguras sin estado
3. **CRUD Completo**: Operaciones Create, Read, Update, Delete
4. **Normalización de Datos**: Manejo de variaciones en nombres de campos
5. **Paginación**: Mejora de rendimiento con carga parcial de datos
6. **Hooks de React**: useState, useEffect, useMemo para gestión de estado
7. **Enrutamiento**: React Router para SPA (Single Page Application)

### Buenas Prácticas Implementadas

- ✅ Variables de entorno para configuración sensible
- ✅ Validación de datos en backend y frontend
- ✅ Manejo de errores consistente
- ✅ Código modular y reutilizable
- ✅ Separación de responsabilidades (MVC)
- ✅ Comentarios descriptivos en código complejo

---

## 🐛 Problemas Conocidos

- [ ] La subida de avatares aún no está implementada en backend
- [ ] Falta validación más estricta en algunos formularios
- [ ] El sistema de notificaciones es placeholder
- [ ] Tests unitarios y de integración pendientes

---

## 🚧 Roadmap

### v1.1 (Próxima versión)

- [ ] Sistema de favoritos funcional
- [ ] Notificaciones por email
- [ ] Búsqueda avanzada con múltiples filtros
- [ ] Exportar resultados a PDF

### v2.0 (Futuro)

- [ ] Panel de administración
- [ ] Sistema de recomendaciones con IA
- [ ] App móvil nativa
- [ ] Integración con APIs oficiales del gobierno

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2025 Quiero Mi Beca

Se concede permiso, libre de cargos, a cualquier persona que obtenga una copia...
```

---

## 📞 Contacto

- **Email**: contacto@quieromibeca.cl
- **GitHub Issues**: [Reportar un problema](https://github.com/tu-usuario/quiero-mi-beca/issues)

---

## 🙏 Agradecimientos

- [MongoDB University](https://university.mongodb.com/) por recursos de aprendizaje
- [React Documentation](https://react.dev/) por excelente documentación
- [Bootstrap](https://getbootstrap.com/) por el framework CSS
- Comunidad de Stack Overflow por resolver dudas

---

## 📚 Recursos Adicionales

### Documentación Técnica

- [Guía de Mongoose](https://mongoosejs.com/docs/guide.html)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Hooks](https://react.dev/reference/react)

### Tutoriales Relacionados

- [JWT Authentication Tutorial](https://jwt.io/introduction)
- [RESTful API Design](https://restfulapi.net/)
- [MongoDB Schema Design](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)

---

**Hecho con ❤️ por estudiantes, para estudiantes**
