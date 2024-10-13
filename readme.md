# Films - Frontend

## Descripción

El frontend de esta aplicación es responsable de la interfaz de usuario y la interacción con el usuario. Está construido utilizando tecnologías como HTML, CSS y JavaScript y utiliza el framework de React.js con Redux.

## Características principales

- Interfaz de usuario intuitiva: El frontend proporciona una interfaz de usuario intuitiva y fácil de usar para que los usuarios interactúen con la aplicación y puedan ver el listado de películas con su respectiva información.
- Navegación entre páginas: El frontend permite la navegación fluida entre diferentes páginas de la aplicación.
- Visualización de datos: El frontend muestra los datos de manera clara y organizada, utilizando componentes y estilos adecuados.
- Interacción en tiempo real: El frontend permite la interacción en tiempo real con el backend, actualizando los datos y mostrando notificaciones en tiempo real.

## Configuración previa

Antes de ejecutar la aplicación, debes tener instalado Node.js: [Descargar e instalar Node.js](https://nodejs.org)

Para que la aplicación funcione correctamente, es necesario tener el backend en ejecución. Puedes encontrar las instrucciones para configurar y ejecutar el backend en el archivo `readme.md` correspondiente.

La url y el puerto por defecto del backend esta definido en la variable `VITE_BACK_URL` en el archivo `.env`, cuyo valor si no modificas el backend debe ser http://localhost:7777/

## Configuración

Una vez que haya instalado las dependencias, siga estos pasos para configurar y ejecutar el frontend:

Clone el repositorio: `git clone https://github.com/...` 2. Navegue al directorio del proyecto: `cd front-inmune` 3. Elimina el directorio .git: `rm -rf .git` 4. Crea tu propio repositorio: `git init` 5. Haz un commit inicial: `git add .` y `git commit -m "Initial commit"` 6. Vincula tu repositorio remoto: `git remote add origin ...`
IMPORTANTE: El link a este repositorio será la única forma de que entregues tu trabajo 7. Instale las dependencias: `npm install` 8. Configure las variables de entorno: Cree un archivo `.env` en el directorio raíz del proyecto y configure las variables de entorno necesarias. Consulte el archivo `.env.sample` para obtener una lista de las variables requeridas. 9. Inicie el servidor de desarrollo: `npm start`

## Estructura del proyecto

El proyecto frontend sigue una estructura de directorios común para una aplicación de React.js. Aquí hay una descripción de los directorios principales:

- `src`: Contiene los archivos fuente de la aplicación, incluyendo componentes, estilos y archivos de configuración.
- `public`: Contiene archivos estáticos que se sirven directamente al navegador, como el archivo HTML principal y los archivos de imagen.
- `components`: Contiene los componentes reutilizables de la aplicación.
- `pages`: Contiene las diferentes páginas de la aplicación.
- `styles`: Contiene los estilos CSS de la aplicación.

Ya tienes instalado y configurado

- editorconfig
- eslint
- prettier
- jest con módulos ESM

Sólo te queda hacer los test de los componentes y los servicios. Puedes redefinir los scripts de test en el package.json si lo necesitas.

En el fichero `jest.config.js` se han configurado algunas exclusiones de ficheros que no se testan. Puedes añadir como exclusiones los ficheros que no sean componentes (hooks, redux) o puedes intentar testarlos para ampliar tus conocimientos
