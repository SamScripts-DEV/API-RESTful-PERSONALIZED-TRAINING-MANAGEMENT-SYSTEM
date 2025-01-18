
# API-RESTful-PERSONALIZED-TRAINING-MANAGEMENT-SYSTEM


## Descripción
Este backend es parte de un sistema personalizado de gestión de entrenamiento físico. Su propósito es ayudar a usuarios a obtener rutinas de ejercicio adaptadas a sus necesidades físicas y objetivos, mientras que los entrenadores pueden gestionar a sus clientes y asignarles rutinas de manera eficiente..

### Características principales 
#### Roles del sistema: 
- **Administrador**: Registra y gestiona entrenadores en la plataforma. 
-  **Entrenador**: Gestiona su lista de clientes, asigna rutinas personalizadas y realiza un seguimiento del progreso de cada cliente. 
- **Cliente**: Registra su perfil, proporciona datos físicos y recibe rutinas de ejercicio personalizadas. 
#### Gestión de usuarios y rutinas: 
- Registro e inicio de sesión para los usuarios con validación por correo electrónico. 
- Asignación de rutinas diarias a los clientes, donde cada día de entrenamiento incluye ejercicios específicos según sus preferencias. 
- Visualización del progreso del cliente y comparación del peso actual con el inicial.
#### Integración con APIs externas: 
- Se utiliza una API externa para gestionar y sincronizar ejercicios específicos en la base de datos. 
#### Configuraciones avanzadas: 
- Tokens JWT para autenticación, con diferentes tiempos de validez según el dispositivo. - Sistema de recuperación de contraseñas para entrenadores. 
#### Pruebas y despliegue: 
- Pruebas realizadas con bases de datos locales y herramientas de estrés como K6. 
- Desplegado en la URL: [personalized-training-management-system.openrender.com](https://personalized-training-management-system.openrender.com).

## Requisitos Previos
- [Node.js](https://nodejs.org/) instalado
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) instalado

## Inicialización del Proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/SamScripts-DEV/API-RESTful-PERSONALIZED-TRAINING-MANAGEMENT-SYSTEM.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd tu-proyecto
   ```

3. Instala los módulos:
   ```bash
   npm install
   ```

4. Configura las variables de entorno (si es necesario), por ejemplo, para la conexión a la base de datos.
	```dotenv 
   MONGO_URI_PRODUCTION  = URI de la base de datos en producción
	MONGO_URI_LOCAL  = URI de la base de datos local
	JWT_SECRET  = Clave secreta para la generación de tokens JWT
	HOST_MAILTRAP  = Host del servicio de Mailtrap
	PORT_MAILTRAP  = Puerto del servicio de Mailtrap
	USER_MAILTRAP  = Usuario de Mailtrap
	PASS_MAILTRAP  = Contraseña de Mailtrap
	URL_FRONT = URL del frontend para redireccionamientos
	
	//Api externa para los ejercicios (RapidAPI)
	API_KEY  =  'Clave de la API externa'
	API_HOST  = 'Host de la API externa'
   ```

5. Ejecuta el proyecto:
   ```bash
   npm start
   ```

## Uso Rápido
### Ejemplo de Endpoint
- **Registro de Usuario**
  - **URL:** `https://personalized-training-management-system.openrender.com/api/v1/sign-up`
  - **Método:** POST
  - **Descripción:** Permite registrar un nuevo usuario en el sistema.
  - **Campos requeridos:**
    - **name** (String): Nombre del usuario.
    - **surname** (String): Apellido del usuario.
    - **email** (String): Correo electrónico del usuario. Este se utiliza para la validación.
    - **password** (String): Contraseña del usuario, que debe tener al menos 8 caracteres, un caracter especial, un número, una mayúscula y una minúscula.
    - **role** (String): Rol del usuario (por defecto es `cliente` si no se especifica). Opciones: `cliente`, `entrenador`, `administrador`.
  - **Ejemplo de solicitud:**

  ```json
  {
    "name": "Juan",
    "surname": "Pérez",
    "email": "juan.perez@example.com",
    "password": "12345678",
    "role": "cliente"
  }

Para más detalles sobre el uso de los diferentes endpoints, consulta el [manual de usuario](URL_DEL_MANUAL).

