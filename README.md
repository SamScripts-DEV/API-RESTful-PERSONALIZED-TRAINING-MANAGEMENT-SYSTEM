
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

# Documentación

## Usuarios
Endpoints relacionados a la gestión de los usuarios en general

### Registro de Usuario
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/sign-up`
- **Método:** POST
- **Descripción:** Permite registrar un nuevo usuario en el sistema, por lo general se usa solo para registrar un usuario Administrador.
- **Campos requeridos:**
  - **name** (String): Nombre del usuario.
  - **lastname** (String): Apellido del usuario.
  - **email** (String): Correo electrónico del usuario. Este se utiliza para la validación.
  - **password** (String): Contraseña del usuario, que debe tener al menos 8 caracteres, un caracter especial, un número, una mayúscula y una minúscula.
  - **role** (String): Rol del usuario (por defecto es `cliente` si no se especifica). Opciones: `cliente`, `entrenador`, `administrador`.
- **Ejemplo de solicitud:**
```json
{
  "name": "Juan",
  "lastname": "Pérez",
  "email": "juan.perez@example.com",
  "password": "Examp123@",
  "role": "administrador"
}
```

### Inicio de Sesión
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/login`
- **Método:** POST
- **Descripción:** Permite a cualquier usuario iniciar sesión en el sistema.
- **Campos requeridos:**
  - **email** (String): Correo electrónico del usuario.
  - **password** (String): Contraseña del usuario.
- **Ejemplo de solicitud:**
```json
{
  "email": "juan.perez@example.com",
  "password": "Examp123@"
}
```

### Cerrar Sesión
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/logout`
- **Método:** GET
- **Descripción:** Cierra la sesión del usuario actual.
- **Autenticación:** Bearer Token requerido

### Obtener Perfil de Usuario
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/user/profile`
- **Método:** GET
- **Descripción:** Obtiene la información del perfil del usuario autenticado.
- **Autenticación:** Bearer Token requerido

### Recuperación de Contraseña
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/users/recovery-password`
- **Método:** POST
- **Descripción:** Envía un correo con el token de recuperación.
- **Campos requeridos:**
  - **email** (String): Correo electrónico del usuario.
- **Ejemplo de solicitud:**
```json
{
  "email": "juan.perez@example.com"
}
```

### Confirmar Token de Recuperación
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/users/confirm/:token`
- **Método:** GET
- **Descripción:** Valida el token de recuperación de contraseña.
- **Parámetros URL:**
  - **token** (String): Token de recuperación recibido por correo.

### Establecer Nueva Contraseña
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/users/new-password/:token`
- **Método:** POST
- **Descripción:** Permite establecer una nueva contraseña.
- **Parámetros URL:**
  - **token** (String): Token de recuperación validado.
- **Campos requeridos:**
  - **password** (String): Nueva contraseña del usuario.
  - **confirmPassword** (String): Confirmación de la nueva contraseña.
- **Ejemplo de solicitud:**
```json
{
  "password": "NuevoPass123@",
  "confirmPassword": "NuevoPass123@"
}
```

### Listar Todos los Clientes
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/view-all`
- **Método:** GET
- **Descripción:** Obtiene la lista de todos los clientes registrados en el sistema.
- **Autenticación:** Bearer Token requerido (Solo administradores)
- 
## Gestión de Entrenadores
Endpoints que el usuario Administrador utiliza para gestionar a los entrenadores del sistema

### Registrar Coach
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/register`
- **Método:** POST
- **Autenticación:** Requiere token Bearer
- **Descripción:** Permite registrar un nuevo entrenador en el sistema.
- **Campos requeridos:**
  - **name** (String): Nombre del entrenador
  - **lastname** (String): Apellido del entrenador
  - **email** (String): Correo electrónico del entrenador
  - **description** (String): Descripción profesional del entrenador
- **Ejemplo de solicitud:**
```json
{
  "name": "Juan",
  "lastname": "Perez",
  "email": "example@gmail.com",
  "description": "Hola, soy Juan, campeón del Mr. Olympia Classic Physique..."
}
```

### Obtener todos los entrenadores
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/view-coaches`
- **Método:** GET
- **Autenticación:** Requiere token Bearer obtenido al autenticarse en el inicio de sesión
- **Descripción:** Obtiene la lista de todos los entrenadores registrados.

### Obtener entrenador por ID
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/view-coach/:id`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la información de un entrenador específico por su ID.

### Obtener los clientes de un entrenador
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/get-clients/:id`
- **Método:** GET
- **Autenticación:** Requiere token Bearer obtenido al autenticarse en el inicio de sesión
- **Descripción:** Obtiene la lista de todos los clientes asignados a un entrenador específico.

### Actualizar Coach por ID
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/update-coach/:id`
- **Método:** PUT
- **Autenticación:** Requiere token Bearer obtenido al autenticarse en el inicio de sesión
- **Descripción:** Actualiza la información de un entrenador específico.
- **Campos actualizables:**
  - **name** (String): Nombre del entrenador
  - **lastname** (String): Apellido del entrenador
  - **email** (String): Correo electrónico del entrenador
  - **description** (String): Descripción profesional del entrenador
- **Ejemplo de solicitud:**
```json
{
  "name": "Juanito",
  "lastname": "Perez",
  "email": "nuevoexample@gmail.com",
  "description": "Hola, soy Juanito Perez, campeón del Mr. Olympia Classic Physique..."
}
```

### Eliminar Coach por ID
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/delete-coach/:id`
- **Método:** DELETE
- **Autenticación:** Requiere token Bearer obtenido al autenticarse en el inicio de sesión
- **Descripción:** Elimina un entrenador específico del sistema.


## Gestión de Clientes
Endpoints con los cuales el usuario Cliente puede gestionar su cuenta y acceder a su rutina personalizada

### Registrar Usuario (Cliente)
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/only-register`
- **Método:** POST
- **Autenticación:** No requiere token
- **Descripción:** Permite registrar un nuevo cliente en el sistema.
- **Campos requeridos:**
  - **name** (String): Nombre del cliente
  - **lastname** (String): Apellido del cliente
  - **email** (String): Correo electrónico del cliente
  - **password** (String): Contraseña del cliente
- **Ejemplo de solicitud:**
```json
{
  "name": "María",
  "lastname": "González",
  "email": "maria.gonzalez@example.com",
  "password": "MiContraseña123*"
}
```

### Confirmación de correo
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/confirm-email`
- **Método:** POST
- **Autenticación:** No requiere token
- **Descripción:** Confirma el correo electrónico del cliente mediante un código.
- **Campos requeridos:**
  - **email** (String): Correo electrónico del cliente
  - **code** (String): Código de verificación
- **Ejemplo de solicitud:**
```json
{
  "email": "maria.gonzalez@example.com",
  "code": "123456"
}
```


### Configurar Perfil
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/configure-profile`
- **Método:** POST
- **Autenticación:** Requiere token Bearer
- **Descripción:** Configura el perfil inicial del cliente.
- **Campos requeridos:**
  - **genre** (String): Género del cliente
  - **weight** (Number): Peso en kilogramos
  - **height** (Number): Altura en centímetros
  - **age** (Number): Edad
  - **levelactivity** (String): Nivel de actividad
  - **days** (Array): Días de entrenamiento
  - **coach_id** (String): ID del entrenador asignado
- **Ejemplo de solicitud:**
```json
{
  "genre": "masculino",
  "weight": 75,
  "height": 175,
  "age": 25,
  "levelactivity": "intermedio",
  "days": ["lunes", "miercoles", "viernes"],
  "coach_id": "67606c3fb44100b3e0488188"
}
```

### Obtener rutina relacionada al cliente autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/view-routine`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la rutina asignada al cliente autenticado.

### Marcar completado el día en curso
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/mark-day-completed`
- **Método:** POST
- **Autenticación:** Requiere token Bearer
- **Descripción:** Marca como completado el entrenamiento del día especificado.
- **Campos requeridos:**
  - **day** (String): Día a marcar como completado
- **Ejemplo de solicitud:**
```json
{
  "day": "Lunes"
}
```

### Obtener los días completados
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/view-completed-days`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la lista de días completados por el cliente.

### Ver perfil del cliente autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/view-profile`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la información del perfil del cliente autenticado.

### Actualizar el perfil del Cliente Autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/client/update-profile`
- **Método:** PUT
- **Autenticación:** Requiere token Bearer
- **Descripción:** Actualiza la información del perfil del cliente.
- **Campos actualizables:**
  - **name** (String): Nombre del cliente
  - **lastname** (String): Apellido del cliente
  - **email** (String): Correo electrónico
  - **genre** (String): Género
  - **weight** (Number): Peso en kilogramos
  - **height** (Number): Altura en centímetros
  - **age** (Number): Edad
  - **levelactivity** (String): Nivel de actividad
  - **days** (Array): Días de entrenamiento
  - **coach_id** (String): ID del entrenador
- **Ejemplo de solicitud:**
```json
{
  "name": "Carlos",
  "lastname": "Rodríguez",
  "email": "carlos.rodriguez@example.com",
  "genre": "masculino",
  "weight": 80,
  "height": 180,
  "age": 28,
  "levelactivity": "avanzado",
  "days": ["lunes", "martes", "jueves", "viernes"],
  "coach_id": "67606c3fb44100b3e0488188"
}
```

## Gestión de Entrenadores (Endpoints para Usuario Entrenador)
Endpoints con los cuales el usuario Entrendaro puede gestionar a sus clientes

### Obtener los clientes relacionados al Entrenador Autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/get-clients`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la lista de todos los clientes asignados al entrenador autenticado.

### Obtener el detalle de un solo Cliente relacionado al entrenador Autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/get-client/:id`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la información detallada de un cliente específico asignado al entrenador.

### Obtener el Perfil del Entrenador Autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/view-profile`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene la información del perfil del entrenador autenticado.

### Actualizar perfil del entrenador Autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/coach/update-profile`
- **Método:** PUT
- **Autenticación:** Requiere token Bearer
- **Descripción:** Actualiza la información del perfil del entrenador.
- **Campos actualizables:**
  - **name** (String): Nombre del entrenador
  - **lastname** (String): Apellido del entrenador
  - **email** (String): Correo electrónico
  - **description** (String): Descripción profesional
- **Ejemplo de solicitud:**
```json
{
  "name": "Juan",
  "lastname": "Pérez",
  "email": "juan.perez@example.com",
  "description": "Entrenador profesional certificado con más de 10 años de experiencia en entrenamiento personalizado. Especialista en culturismo y preparación física para competencias. Mi objetivo es ayudarte a alcanzar tus metas fitness mediante programas personalizados y seguimiento constante."
}
```

## Gestión de Rutinas (Endpoints para Usuario Entrenador)
Endpoints con los cuales el usuario Entrenador puede gestionar la asignación de rutinas a sus clientes.

### Crear rutina
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/routine/create-routine`
- **Método:** POST
- **Autenticación:** Requiere token Bearer
- **Descripción:** Permite crear una nueva rutina para un cliente específico.
- **Campos requeridos:**
  - **client_id** (String): ID del cliente
  - **days** (Array): Arreglo de objetos con días y ejercicios
  - **comments** (String): Comentarios sobre la rutina
  - **nameRoutine** (String): Nombre de la rutina
  - **start_date** (String): Fecha de inicio (YYYY-MM-DD)
  - **end_date** (String): Fecha de finalización (YYYY-MM-DD)
- **Ejemplo de solicitud:**
```json
{
  "client_id": "12345abcde",
  "days": [
    {
      "day": "lunes",
      "exercises": [
        "exercise_id_1",
        "exercise_id_2",
        "exercise_id_3"
      ]
    },
    {
      "day": "miercoles",
      "exercises": [
        "exercise_id_4",
        "exercise_id_5"
      ]
    },
    {
      "day": "viernes",
      "exercises": [
        "exercise_id_6",
        "exercise_id_7"
      ]
    }
  ],
  "comments": "Rutina de adaptación muscular para principiantes",
  "nameRoutine": "FULLBODY INICIAL",
  "start_date": "2024-01-20",
  "end_date": "2024-02-20"
}
```

### Obtener todas las rutinas relacionadas al Entrenador Autenticado
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/routine/view-routines`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene todas las rutinas creadas por el entrenador autenticado.

### Obtener una rutina por su ID
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/routine/view-routine/:id`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene el detalle de una rutina específica por su ID.

### Obtener todas las rutinas de un cliente
- **URL:** `{{URIP}}/routine/view-routines/:client_id`
- **Método:** GET
- **Autenticación:** Requiere token Bearer
- **Descripción:** Obtiene todas las rutinas asignadas a un cliente específico.

### Actualizar una rutina por ID
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/routine/update-routine/:id`
- **Método:** PUT
- **Autenticación:** Requiere token Bearer
- **Descripción:** Actualiza una rutina existente.
- **Campos actualizables:**
  - **days** (Array): Arreglo de objetos con días y ejercicios
  - **comments** (String): Comentarios sobre la rutina
  - **nameRoutine** (String): Nombre de la rutina
  - **start_date** (String): Fecha de inicio
  - **end_date** (String): Fecha de finalización
- **Ejemplo de solicitud:**
```json
{
  "days": [
    {
      "day": "lunes",
      "exercises": [
        "exercise_id_1",
        "exercise_id_2"
      ]
    },
    {
      "day": "miercoles",
      "exercises": [
        "exercise_id_3",
        "exercise_id_4"
      ]
    }
  ],
  "comments": "Rutina modificada para aumentar intensidad",
  "nameRoutine": "FULLBODY AVANZADO",
  "start_date": "2024-02-01",
  "end_date": "2024-03-01"
}
```

### Eliminar rutina por ID
- **URL:** `https://personalized-training-management-system.openrender.com/api/v1/routine/delete-routine/:id`
- **Método:** DELETE
- **Autenticación:** Requiere token Bearer
- **Descripción:** Elimina una rutina específica del sistema.

## Endpoints de Progreso

Estos endpoints permiten a los clientes registrar y gestionar su progreso en el sistema.

### Registrar Progreso

* **URL:** `https://personalized-training-management-system.openrender.com/api/v1/progress`
* **Método:** POST
* **Descripción:** Permite registrar un nuevo progreso del cliente.
* **Autenticación:** Bearer Token requerido
* **Body:**
  * **currentWeight** (Number): Peso actual del cliente
  * **observations** (String): Observaciones sobre el progreso
* **Ejemplo de solicitud:**
```json
{
    "currentWeight": 75,
    "observations": "Levante PR en Sentadilla"
}
```

### Obtener Progreso por ID

* **URL:** `https://personalized-training-management-system.openrender.com/api/v1/progress/:id`
* **Método:** GET
* **Descripción:** Obtiene un progreso específico mediante su ID
* **Autenticación:** Bearer Token requerido
* **Parámetros URL:**
  * **id** (String): ID del progreso a consultar

### Obtener Progresos por Cliente

* **URL:** `https://personalized-training-management-system.openrender.com/api/v1/progress/client/:clientId`
* **Método:** GET
* **Descripción:** Obtiene todos los progresos registrados de un cliente específico
* **Autenticación:** Bearer Token requerido
* **Parámetros URL:**
  * **clientId** (String): ID del cliente

### Actualizar Progreso

* **URL:** `https://personalized-training-management-system.openrender.com/api/v1/progress/:id`
* **Método:** PUT
* **Descripción:** Actualiza la información de un progreso específico
* **Autenticación:** Bearer Token requerido
* **Parámetros URL:**
  * **id** (String): ID del progreso a actualizar
* **Body:**
```json
{
    "currentWeight": 75,
    "observations": "Levante PR en Sentadilla y Press de banca"
}
```

### Eliminar Progreso

* **URL:** `https://personalized-training-management-system.openrender.com/api/v1/progress/:id`
* **Método:** DELETE
* **Descripción:** Elimina un progreso específico del sistema
* **Autenticación:** Bearer Token requerido
* **Parámetros URL:**
  * **id** (String): ID del progreso a eliminar

¿Te gustaría que agregue alguna información adicional como códigos de respuesta o ejemplos de respuesta para cada endpoint?

Para comprobar las respuestas esperadas consulte el [manual de usuario](https://youtu.be/bTaxozVr7H4?si=OWDYavrOCHYjwkL5).



