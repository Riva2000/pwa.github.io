//Archivo sw.js
//Agregar la referencia al archivo js/sw-acceces.js

importScripts('/pwa.github.io/js/sw-acces.js')
const CACHE_NAME = 'cache-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';

const APP_SHELL = [
    '/pwa.github.io/','/pwa.github.io/index.html','/pwa.github.io/css/style.css','/pwa.github.io/img/favicon.ico','/pwa.github.io/js/app.js','/pwa.github.io/img/avs/client.jpg'
];

const APP_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', event => {
    const cache_app = caches.open(CACHE_NAME)
        .then(cache => {
            cache.addAll(APP_SHELL)
            
        })
    const cache_inmutable = caches.open(CACHE_INMUTABLE)
        .then(cache => {
            cache.addAll(APP_INMUTABLE)
        })

    event.waitUntil( Promise.all([cache_app, cache_inmutable]) )
})

//Archivo sw.js
//3. Hacer la activación del sw, eliminando las versiones antiguas de cache.

self.addEventListener('activate', event => {
    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key => {
            if(key !== CACHE_NAME && key.includes('cache')){
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(respuesta);
});

//Archivo sw.js
//3. Hacer la estrategia de cache, este ejemplo un marco referencial, cada equipo determinará 
//la estrategia adecuada para su sitio web, esto conforme a las estrategias trabajadas en clase.

self.addEventListener('fetch', event => {
    const respuesta = caches.match(event.request).then( res => {
        if(res){return res;}
        else{
            return fetch(e.request).then(newRes => {
                //Agregar en el directorio /js un archivo llamdado sw-acces.js
                //y programar la funcion actualizaCacheDinamico, para tener mas limpio el proyecto.
                return actualizaCacheDinamico(CACHE_DYNAMIC_NAME, event.request, newRes);
            });
        }
    });
});