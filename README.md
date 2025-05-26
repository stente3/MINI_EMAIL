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

---

## 🔁 ¿Qué es una API?

Una **API (Interfaz de Programación de Aplicaciones)** permite que el front-end y el back-end se comuniquen. En este proyecto, el back-end expone rutas HTTP que permiten operaciones como:

- Registro de usuarios
- Inicio de sesión
- Envío y recepción de correos

---

## 🌐 Comunicación entre Front-end y Back-end

El front-end se comunica con el back-end mediante **peticiones HTTP** usando `fetch`. Por ejemplo, para iniciar sesión, se envía una solicitud `POST` con los datos del usuario y el servidor responde si son válidos o no.

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

## 🗂️ Características de la Aplicación

### 🏠 Pantalla de Inicio

- Permite al usuario **registrarse** o **iniciar sesión**.

### 📥 Panel de Correos

- Muestra todos los correos recibidos por el usuario autenticado.

### 📨 Envío de Correos

- Formulario para enviar mensajes a otros usuarios registrados.

### 📌 Estructura de cada Correo

Cada mensaje incluye:

- **Asunto**
- **Contenido**
- **Remitente**
- **Receptor**

---

## 💾 Almacenamiento de Datos

No se utiliza una base de datos. Toda la información se gestiona a través de archivos `.json`:

- Usuarios: `MINI_EMAIL/Back/data/users.json`
- Correos: se almacenan de forma similar (ubicación puede variar)

> ⚠️ **Nota:** No se implementa cifrado de contraseñas ni protección avanzada de datos debido al propósito educativo y entorno controlado.

---

## 📝 Registro de Usuarios

Los nuevos usuarios pueden registrarse con los siguientes campos:

- Username
- Email
- Password

---

## 🔐 Inicio de Sesión

Para acceder a su cuenta, el usuario debe proporcionar:

- Email
- Password

---

## 🚀 Funcionalidades Recientes

### ✅ Gestión de Sesiones

- **Mantenimiento de sesión activa** usando `localStorage`
- **Redirección automática al panel de correos** si hay sesión activa
- **Protección de rutas**: si se accede al panel sin sesión, se redirige al inicio
- **Funcionalidad de cierre de sesión**

### 🧱 Estructura Modular del Proyecto

- Refactorización para una mejor organización del código
- Separación clara en carpetas y archivos por funcionalidad
- Facilita el mantenimiento y escalabilidad de la aplicación

---

## 🛠️ Estado del Proyecto

Este proyecto está en etapa MVP (_Producto Mínimo Viable_). Aunque funcional, su propósito es educativo, por lo que carece de ciertas características de seguridad y escalabilidad necesarias en un entorno de producción.
