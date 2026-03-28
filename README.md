# 🌤️ App del Clima - Vue 3 (Usuarios, Login y Estado Global) Módulo 7

Aplicación web desarrollada con Vue 3 que permite visualizar información climática de distintas ciudades, gestionar favoritos y explorar detalles semanales.
La App de Clima contiene un sistema básico de usuarios (registro/login) utilizando Vue, Vue Router,
Axios (o datos mock) y Vuex  manejan el estado global de autenticación y las preferencias de cada
usuario.
En esta iteración el foco está en autenticación y personalización: que la aplicación “reconozca” a la
persona que inicia sesión y muestre parte de la información ajustada a ese usuario (por ejemplo, sus
lugares favoritos o sus preferencias de temperatura).
• Se implementan pantallas de registro e inicio de sesión en una SPA hecha con Vue.
• Se utiliza Vuex para almacenar el estado de autenticación y los datos básicos del usuario.
• Se protegen secciones de la aplicación mediante rutas que requieren estar logueado.
• Se ajustan partes de la interfaz según el usuario autenticado (preferencias de temperatura, lugares favoritos, etc.).

Sobre la base de la SPA en Vue de Módulo 6:
• Se añade login con formulario de inicio de sesión.
• Se define un flujo de autenticación sencillo:
 1) Usuario ingresa credenciales.
 2) Si el login es correcto, se guarda la información del usuario en Vuex y la app
redirige a Home (o a la última ruta visitada). 
 3) Si el login falla, se muestra un mensaje de error.
 4) Algunas secciones deben ser “solo para usuarios autenticados”: 
o Acceder a detalle de ciudad para ver su información (redirige de inmediato a Login).
o Ver o editar “lugares favoritos”(se solicita acceder a Login).
o Seleccionar unidad de temperatura °C/°F (se muestra restricción). 

## 👤 Sistema de Usuarios

La aplicación implementa un sistema básico de autenticación que permite:

- Registro e inicio de sesión de usuarios.
- Almacenamiento del estado global mediante Vuex.
- Personalización de la experiencia según el usuario autenticado.

### 🔐 Información almacenada por usuario:

Cada usuario guarda:

- Nombre de usuario
- Credenciales de acceso (simuladas)
- Preferencia de unidad de temperatura (°C / °F)
- Lista de ciudades favoritas

Estos datos permiten que la aplicación adapte la interfaz y funcionalidades según el usuario activo.

## 🛣️ Rutas de Autenticación

La aplicación cuenta con rutas protegidas y públicas:

- `/login` → Pantalla de inicio de sesión.
- `/registro` → No implementado (autenticación simulada con datos mock en el frontend)
- `/favoritos` → Gestión de ciudades favoritas (solo usuarios autenticados).

> 📌Nota: Las rutas protegidas redirigen al usuario a `/login` si no ha iniciado sesión.

> ⚙️Nota técnica: La autenticación se implementa mediante datos simulados (mock), por lo que no se utilizó Axios en esta versión. 


---
### 🗂️ Estructura del Proyecto

```plaintext
CLIMA-APP/
├── public/
│   ├── Assets/
│   │   └── cities/       # Imágenes de ciudades
│   └── favicon.ico
├── screenshots/          # Capturas de la app
├── src/
│   ├── assets/           # CSS, imágenes internas, iconos
│   │   ├── css/
│   │   │   ├── styles.css
│   │   │   └── main.css
│   ├── components/       # Actualmente vacío
│   ├── data/             # cities.js
│   ├── router/           # Vue Router, rutas de la app
│   │   └── index.js
│   ├── stores/           # Vuex
│   │   └── index.js
│   ├── views/            
│   │   ├── About.vue
│   │   ├── Detail.vue
│   │   ├── Login.vue
│   │   └── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🚀 Demo 

https://github.com/christelita/App-Clima.git 

---

## 📸 Capturas del proyecto App-Clima


A continuación se muestran las diferentes pantallas de la aplicación:

---
## 🏠 Home
![Home](./screenshots/Home.png)

---
## 🔐 Solicitud de Login para cambio de temperatura
![Solicitud de Login](./screenshots/Alerta_ingreso.png)

## 📝 Login
![Login](./screenshots/Login.png)

## ❌ Usuario Incorrecto
![Usuario Incorrecto](./screenshots/Usuario_incorrecto.png)

---
## ⭐ Favoritos (Ciudades marcadas con estrella)
![Favoritos Activos](./screenshots/Favoritos_activos.png)

## 🔍 Buscador de Ciudad
![Buscador Ciudad](./screenshots/Buscador.png)

---
## 📍 Detalle de ciudad
![Detalle](./screenshots/Detalle_ciudad_relieve.png)

## 🃏 Card Icono Badges (humedad, viento y coordenadas)
![Card Icono Badges](./screenshots/Card_icono_badges.png)



---

## ✨ Funcionalidades

- 🔍 Búsqueda de ciudades
- ⭐ Sistema de favoritos
- 🌡️ Cambio de temperatura (°C / °F)
- 🔐 Autenticación simulada
- 📊 Pronóstico semanal
- 🎨 Interfaz moderna con sutil animación


## 🔄 Integración de datos reales

Este proyecto consume datos en tiempo real desde una API de clima (OpenWeather), reemplazando datos estáticos o simulados.

La aplicación obtiene información dinámica como:

- Temperatura actual
- Estado del clima (cielo claro, nublado, lluvia, etc.)
- Humedad
- Velocidad del viento
- Coordenadas geográficas

Estos datos se actualizan automáticamente al cargar la aplicación, permitiendo mostrar información real y actualizada de distintas ciudades del mundo.

## ⚙️ Manejo de datos

La información es procesada y adaptada para su visualización en la interfaz, incluyendo:

- Conversión de unidades (°C / °F)
- Normalización de descripciones del clima para iconos dinámicos
- Formateo de coordenadas y valores numéricos

---



## 🛠️ Tecnologías utilizadas

- Vue 3
- Vite
- Vue Router
- Vuex
- Axios (consumo de API REST)
- JavaScript (ES6+)
- Bootstrap 5
- OpenWeather API

---

## ▶️ Cómo ejecutar el proyecto


1. Clonar el repositorio: git clone https://github.com/christelita/App-Clima.git  
2. Entrar al proyecto: cd clima-app  
3. Instalar dependencias: npm install  
4. Ejecutar: npm run dev  
5. Abrir: http://localhost:5173  



## 🧠 Aprendizajes

Durante este proyecto se reforzó:

- Manejo de estado global con Pinia
- Navegación con Vue Router
- Componentización en Vue
- Mejora de experiencia de usuario (UX/UI)
- Organización de código en proyectos reales

---

## 👩‍💻 Autora

Desarrollado por **Christel, Front End Trainee 💙**

Proyecto realizado en el contexto de formación de **SENCE Chile**

---

## 📌 Estado del proyecto

🚧 En constante mejora (UI, animaciones y nuevas funcionalidades)