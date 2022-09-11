# Formulario de Registro
La aplicación de un Formulario de Registro ha sido desarrollada sobre el framework **React JS**, utilizando el gestor de paquetes **Node.js**.

La aplicación en cuestión solicita al usuario la introducción de sus datos personales: nombre, apellidos, fecha de nacimiento y su email; además de solicitar la aceptación de unos Términos y Condiciones y una verificación Captcha. Posteriormente a la introducción de todos estos datos obligatorios, la información se guarda en la sesión del navegador. Ver Ilustración 1: captura de pantalla del formulario web.

Además, se guardará junto a estos dos datos de marca de tiempo de envío del formulario: el valor time correspondiente a la marca de tiempo en formato UNIX y el valor date correspondiente a la marca de tiempo en formato legible UTC. Estos datos guardados pueden visualizarse desde la herramienta de inspeccionar, en la pestaña de Aplicación. Ver Ilustración 2: captura de pantalla de los datos guardados en sesión.

## Código fuente

El código fuente puede encontrarse en el repositorio de GitHub: [github.com/oscar-llury/react-register-example](https://github.com/oscar-llury/react-register-example). Además, para poder utilizar una demo en vivo, este repositorio se encuentra enlazado con la aplicación web [Vercel](https://vercel.com/), la cual permite construir y desplegar la aplicación en un dominio accesible y totalmente usable para un usuario. En este caso, el Formulario de Registro puede encontrarse en la **URL principal**: [react-register-example.vercel.app](https://react-register-example.vercel.app/) y en los dominios que despliegan cada rama del repositorio Git:

 - Para la rama master: [react-register-example-git-master-oscar-llury.vercel.app](https://react-register-example-git-master-oscar-llury.vercel.app/)
 - Para la rama development: [react-register-example-git-development-oscar-llury.vercel.app](https://react-register-example-git-development-oscar-llury.vercel.app/)

## Despliegue en local
 
Para desplegar el proyecto en un entorno local, se deben seguir secuencialmente los siguientes pasos:

 1. Descargar el código fuente.
 2. Ejecutar en consola en la raíz del proyecto el comando `npm install` para descargar las dependencias necesarias. Para este paso es imprescindible tener instalado **Node.JS** en la máquina.
 3. Ejecutar en consola en la raíz del proyecto el comando `npm run start` para levantar un servidor node y poder visualizar el proyecto en la URL **localhost:3000**.

También está disponible el comando `npm run build` el cual creará una carpeta llamada **build** en la que se generarán los archivos de una versión compilada para posteriormente publicarla en un servidor.
 
