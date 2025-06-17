# 🐾 Pet Name Generator Ai - Frontend

Este es el frontend del proyecto **Generador de Nombres para Mascotas**, desarrollado en **Vue.js**. Los usuarios pueden ingresar información sobre su mascota y recibir una lista personalizada de nombres sugeridos por inteligencia artificial (Gemini).

## 🚀 Tecnologías usadas

- [Vue 3 + Vite](https://vitejs.dev/)
- Tailwind CSS (para estilos rápidos y responsivos)
- Axios (para consumo de la API)
- Vue Router (para navegación de vistas)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/petname-generator-frontend.git
   cd petname-generator-frontend
   ```

2. Instalar las dependendcias:
- npm install

3. Crea un archivo .env en la raíz del proyecto:
- VITE_APP_URL='http://localhost:8000/auth/v1'
- VITE_CLIENT_ID='your_google_oauth_client'

4. Inia el sevidor de desarrollo:
- npm run dev

Estructura de Carpetas

src/
├── components/
├── views/
├── services/
├── router/
├── assets/
└── App.vue

5. Funcionalidades

- Formulario para ingresar tipo, género, color y personalidad de la mascota

- Comunicación con el backend vía API REST

- Renderizado dinámico de nombres generados

- Diseño responsive con Tailwind

6. ¿Cómo funciona con la IA?

- La información del formulario se envía al backend, que procesa la solicitud con Gemini (IA de Google) y responde con una lista de nombres personalizados.