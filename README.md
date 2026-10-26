# AuthGuard_RicardoCrespo

Práctica de Desarrollo de Interfaces: aplicación Ionic + Angular Standalone con autenticación simulada y protección de rutas mediante guardas funcionales.

## Funcionalidades

- Inicio de sesión con comprobación de credenciales.
- Estado reactivo mediante `signal` y `computed`.
- Persistencia de la sesión en `sessionStorage`.
- Guarda de autenticación para impedir el acceso sin sesión.
- Guarda de roles para controlar el acceso a cada panel.
- Cierre de sesión y redirección al login.
- Carga diferida de las páginas.

## Usuarios de prueba

| Usuario | Contraseña | Ruta |
|---|---|---|
| admin | 123 | `/admin` |
| operador | 123 | `/user-dashboard` |

La autenticación es una simulación didáctica realizada en el navegador.

## Ejecución local

```bash
npm ci
npm start
```

## Comprobaciones

```bash
npm run build
npm run lint
```

Se ha comprobado el rechazo de credenciales incorrectas, el acceso por roles, la redirección al intentar acceder sin permisos, la persistencia al recargar y el cierre de sesión.

## Despliegue

El archivo `vercel.json` configura la compilación, el directorio de salida `www` y la redirección a `index.html` para gestionar las rutas de Angular.

## Autor

Ricardo Crespo — 2.º DAM · Desarrollo de Interfaces