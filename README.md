# Weather App

Aplicación web estática para consultar el clima por ciudad o código postal, con mapa, sugerencias de ciudades y fondo dinámico según las condiciones.

## Ejecutar en local

Solo necesitas abrir `index.html` en el navegador o servir la carpeta con un servidor estático.

## Publicar en GitHub

1. Crea un repositorio vacío en GitHub.
2. En esta carpeta ejecuta:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## Desplegar en Vercel

1. Entra a Vercel y conecta el repositorio de GitHub.
2. Importa el proyecto.
3. Agrega una variable de entorno llamada `OPENWEATHER_API_KEY` con tu key nueva.
4. Como es una web estática con una función serverless, Vercel puede desplegarlo sin build command.
5. Si te lo pide, usa:
   - Build Command: vacío
   - Output Directory: `.` o deja el valor por defecto para sitio estático

## Cómo funciona ahora

- El navegador ya no llama a OpenWeather directamente.
- `script.js` llama a `/api/weather`.
- `api/weather.js` toma la key desde `process.env.OPENWEATHER_API_KEY`.
- Vercel inyecta esa variable solo en el servidor, no en el frontend.

## Cambios clave

1. Antes, la key estaba escrita en `script.js`.
2. Ahora, la key vive en la variable de entorno de Vercel.
3. El frontend solo conoce la ruta `/api/weather`.
4. La función serverless hace la petición real a OpenWeather.

## Nota importante

La clave de OpenWeather ya no debe estar en `script.js`. Ahora debe vivir como variable de entorno en Vercel para no exponerla en el navegador.
