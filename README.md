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
3. Como es una web estática, Vercel puede desplegarlo sin build command.
4. Si te lo pide, usa:
   - Build Command: vacío
   - Output Directory: `.` o deja el valor por defecto para sitio estático

## Nota importante

La clave de OpenWeather está en `script.js`. Funciona para pruebas y demos, pero en producción conviene moverla a un backend o a una función serverless para no exponerla en el navegador.
