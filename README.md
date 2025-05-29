# 📧 Aplicación Web Full-Stack: Simulador de Correo en Red LAN

Este proyecto es una **aplicación web full-stack** que simula un sistema de correo electrónico dentro de una red local, creada con `nmcli`. Su propósito es permitir la comunicación entre usuarios conectados a una misma red LAN sin necesidad de conexión a Internet.

---

## 📘 Requisitos de Conocimiento para Comprender la Aplicación

Para comprender completamente esta aplicación, se recomienda tener conocimientos previos en los siguientes temas:

### 📡 ¿Cómo funciona el programa `nmcli`?

`nmcli` es una herramienta de línea de comandos utilizada para gestionar conexiones de red en sistemas Linux que usan NetworkManager.

#### 🧪 Ejemplo:

```bash
nmcli device wifi hotspot ifname wlp2s0 ssid MiRedLAN password 12345678
```

Este comando crea un punto de acceso Wi-Fi (hotspot) con el nombre de red (SSID) **MiRedLAN** y la contraseña **12345678**, usando la interfaz de red **wlp2s0**. Esto permite que otros dispositivos se conecten a esta red local, incluso sin conexión a Internet.

> 📌 **¿Una red Wi-Fi necesita Internet?**
> No. Una red Wi-Fi puede funcionar localmente sin acceso a Internet. En este proyecto, se simula una red LAN que funciona de manera independiente.

### 📦 ¿Qué es un bundler (viteJS)?

Un **bundler** es una herramienta que analiza, agrupa y transforma los distintos archivos fuente de una aplicación web (JavaScript, CSS, imágenes, etc.) en un conjunto optimizado de archivos que pueden ser servidos eficientemente al navegador.

Durante el desarrollo, normalmente trabajamos con múltiples módulos y recursos separados. El bundler resuelve las dependencias entre estos módulos y los empaqueta en uno o varios archivos finales. Esto mejora el rendimiento de carga y simplifica la distribución de la aplicación.

**ViteJS** es un bundler moderno que se destaca por:

- Su tiempo de arranque extremadamente rápido gracias a **ES Modules nativos**.
- Recarga en caliente (HMR) para desarrollo ágil.
- Compilación bajo demanda (sólo los archivos modificados se reconstruyen).
- Soporte integrado para frameworks modernos como React, Vue, y Svelte.

> En este proyecto, ViteJS se encarga de servir el front-end de forma optimizada y rápida durante el desarrollo.

### ⚙️ ¿Qué es una función asíncrona?

Una **función asíncrona** (`async`) en JavaScript es una función que permite manejar operaciones que pueden tardar en completarse (como leer archivos, hacer peticiones HTTP, esperar respuestas de una base de datos, etc.) sin bloquear el flujo principal del programa.

Internamente, cuando una función `async` se ejecuta:

1. Devuelve automáticamente una **promesa**.
2. Dentro de esa función, podemos usar la palabra clave `await` para **pausar la ejecución** hasta que una promesa se resuelva (o falle).
3. Mientras tanto, el hilo principal (event loop) **sigue ejecutando otras tareas**.

Esto es posible gracias al **modelo de concurrencia basado en el event loop** de JavaScript, que permite manejar múltiples operaciones I/O sin usar hilos múltiples, lo cual es muy eficiente para aplicaciones web.

#### 🔍 Ejemplo:

```js
async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://api.ejemplo.com/datos");
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
```

Aquí, `fetch()` devuelve una promesa que se resuelve cuando la respuesta está disponible. `await` permite que el resto del código dentro de la función espere sin bloquear el hilo principal.

---

### 🔁 ¿Qué es una API?

Una **API (Application Programming Interface)** es una interfaz que define cómo diferentes componentes de software deben interactuar entre sí. En el contexto de aplicaciones web, una API permite que el **front-end (cliente)** se comunique con el **back-end (servidor)** a través de **rutas HTTP**.

Las APIs funcionan como **puertas de acceso a funciones específicas del servidor**, como registrar usuarios, autenticar sesiones o acceder a datos guardados. Utilizan métodos HTTP como:

- `GET`: obtener información
- `POST`: enviar información
- `PUT/PATCH`: actualizar información
- `DELETE`: eliminar información

Por debajo, cada petición a la API es manejada por una ruta definida en el servidor (usando Express, por ejemplo), que realiza una acción y responde con un resultado estructurado (normalmente en formato JSON).

> En esta aplicación, el servidor Node.js expone una API REST que maneja operaciones como autenticación y envío de correos.

## 🌐 Comunicación entre Front-end y Back-end

El front-end se comunica con el back-end mediante **peticiones HTTP** usando `fetch`. Por ejemplo, para iniciar sesión, se envía una solicitud `POST` con los datos del usuario y el servidor responde si son válidos o no.

Puedes agregar el siguiente párrafo justo después:

> Para facilitar esta comunicación y evitar repetir la URL del servidor en múltiples archivos, el front-end utiliza un archivo `.env` que contiene una variable que dice en donde se encuentra el back-end

Ejemplo:

> ```env
> VITE_API_URL=http://localhost:3000
> ```
>
> Esta variable se usa en el código para construir dinámicamente las rutas de la API. Esto mejora el mantenimiento del proyecto y permite modificar fácilmente la URL del servidor si cambia en el futuro (por ejemplo, al desplegar la aplicación).

---

## 📄 ¿Qué es un archivo JSON?

Un archivo `.json` es un formato ligero de intercambio de datos. Se utiliza tanto para guardar usuarios como correos. Ejemplo:

```json
{
  "username": "usuario123",
  "email": "correo@ejemplo.com",
  "password": "contraseña"
}
```

---

### 🌐 ¿Qué es CORS (Cross-Origin Resource Sharing)?

**CORS** es un mecanismo de seguridad implementado en los navegadores para restringir o permitir las solicitudes que se hacen entre diferentes **orígenes** (dominios, protocolos o puertos). Por defecto, por razones de seguridad, los navegadores bloquean las solicitudes HTTP que provienen de un origen diferente al del servidor.

Por ejemplo, si tu front-end se sirve desde `http://localhost:5173` y tu back-end desde `http://localhost:3000`, el navegador considera que están en **orígenes distintos**, por lo que bloqueará las solicitudes a menos que el servidor permita explícitamente ese acceso.

Para permitir estas solicitudes, el servidor debe incluir cabeceras específicas, como:

```http
Access-Control-Allow-Origin: http://localhost:5173
```

En aplicaciones Node.js con Express, se puede usar el paquete `cors` para manejar esto fácilmente:

```js
const cors = require("cors");
app.use(cors());
```

> En este proyecto, CORS se habilita para que el **front-end pueda comunicarse con el back-end** sin que el navegador bloquee las peticiones.

---

## 🧩 Tecnologías Utilizadas

### Front-end:

- **ViteJS** (como _bundler_)
- HTML5
- CSS3
- JavaScript

### Back-end:

- Node.js
- Express.js
- `uuidv4` para generar identificadores únicos

---

## 📂 Estructura del Proyecto

```
MINI_EMAIL/
├── Back/
│   ├── app.js
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── solicitudes.http
│   └── server.js
├── Front/
│   ├── css/
│   ├── js/
│   ├── pages/
│   ├── public/
│   └── index.html
└── README.md

```

---

## 🗂️ Características de la Aplicación

### 🏠 Pantalla de Inicio

- Permite al usuario **registrarse** o **iniciar sesión**.

### 📥 Panel de Correos

- Muestra todos los correos recibidos por el usuario autenticado.

### 📨 Envío de Correos

- Formulario para enviar mensajes a otros usuarios registrados.

#### 📧 Validación de Usuario al Enviar Correos

Una funcionalidad importante de esta aplicación es la **verificación de la existencia del usuario receptor** antes de enviar un correo. Esto significa que:

- Cuando un usuario intenta enviar un mensaje, el servidor primero **comprueba si el destinatario está registrado** en el sistema (es decir, si existe en el archivo `users.json`).
- Si el destinatario **no existe**, el correo **no se envía** y se muestra un mensaje de error.
- Esta validación evita que se pierdan mensajes o se almacenen correos con receptores inválidos.

Esta lógica mejora la integridad de los datos y garantiza que todos los correos enviados tengan un destinatario válido dentro de la red LAN simulada.

### 📌 Estructura de cada Correo

Cada mensaje incluye:

- **Asunto**
- **Contenido**
- **Remitente**
- **Receptor**

---

## 📄 Almacenamiento de Datos

No usamos bases de datos, sino archivos `.json`:

- Usuarios: `MINI_EMAIL/Back/data/users.json`
- Correos: `MINI_EMAIL/Back/data/mails.json`

Los correos almacenan campos como:

```json
{
  "id": "uuid",
  "sender": "usuario1@correo.com",
  "receiver": "usuario2@correo.com",
  "subject": "Hola",
  "content": "Mensaje de prueba",
  "timestamp": "fecha"
}
```

---

## 🗂️ Funcionalidades de la Aplicación

### ✅ Registro de Usuario

El usuario puede registrarse enviando sus datos al endpoint:

```http
POST http://localhost:3000/auth/register
```

### 🔐 Inicio de Sesión

Los usuarios acceden al sistema usando email y contraseña:

```http
POST http://localhost:3000/auth/login
```

### ✉️ Envío de Correos

Formulario que permite a los usuarios enviar correos a otros registrados.

```http
POST http://localhost:3000/mails/send
```

### 📥 Ver Correos Recibidos

Los usuarios pueden ver su bandeja de entrada:

```http
GET http://localhost:3000/mails/inbox/laura@correo.com
```

### 📤 Ver Correos Enviados

También pueden revisar correos enviados:

```http
GET http://localhost:3000/mails/sent/camilo@gmail.com
```

---

## 📜 Explicación del archivo `solicitudes.http`

El archivo `solicitudes.http` contiene ejemplos de peticiones HTTP usadas para probar los endpoints de la API. Puede usarse con extensiones como "REST Client" en VSCode para ejecutar las solicitudes directamente desde el editor.

Ejemplos incluidos:

- Registro de usuario
- Login
- Envío de correo
- Ver bandeja de entrada
- Ver correos enviados

---

## ⚙️ Gestión de Sesiones

- Guardado de sesión en `localStorage`
- Redirección automática si hay sesión activa
- Protección contra acceso no autorizado al panel

---

## 🧱 Organización Modular del Proyecto

- Separación entre controladores, servicios y rutas en el back-end
- Código del front-end organizado por vistas, estilos y scripts
- Uso de bundler ViteJS para el empaquetado del front-end

---

## 🛠️ Estado del Proyecto

El sistema está en etapa **MVP** (Producto Mínimo Viable). Es funcional, pero carece de aspectos de seguridad y rendimiento necesarios para producción. Se creó con fines **educativos**.
