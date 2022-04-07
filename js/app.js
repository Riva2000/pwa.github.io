//Archivo js/app.js
//Instalar el Service Worker, para usarlo cuando estemos en local
//y cuando estemos en producción (GitHub Pages), para esto validaremos si se
//esta corriendo la PWA en desarrollo o en producción

//determinar en donde se esta corriendo la aplicación
var url = window.location.href; //obtenemos todo el url
var pwaLocation = '/pwa.github.io/sw.js'; //path donde se encuentra el sw en GitHub

if(navigator.serviceWorker){
    if(url.includes('localhost')){
        pwaLocation = '/sw.js';
    }
navigator.serviceWorker.register(pwaLocation);
}