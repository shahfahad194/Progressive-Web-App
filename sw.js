var cachename='my-pwa-app';
var newcache='new-cache01';
var filesToCache=[
'/index.html' ,
'/style.css' ,
'/index.js',
'/',
];

//serviceworker installation
self.addEventListener('install' , function(e){
    console.log('[serviceWorker] Install');
    e.waitUntil(
        caches.open(cachename).then(function(cache){
            console.log('[serviceWorker] caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});



//activate service worker
self.addEventListener('activate', function(e){
    console.log('[serviceworker] activate');
   e.waitUntil(
       caches.keys().then(function(keyList){
           return Promise.all(keyList.map(function(key){
            if(key !== cachename ){
                console.log('[serviceworker] removing old caches' , key);
                return caches.delete(key);
            }
           }));

       })
   )

   return self.clients.claim();
}); 




self.addEventListener('fetch',function(event){
    console.log('[serviceworker] fetch', event.request.url);
    if (event.request.url.startsWith("https://api.github.com/users/shahfahad194")){
        caches.open(newcache).then(function(cache){
            return fetch(event.request).then(function(response){
                cache.put(event.request,response.clone());
                    return response;
            }) 
        }) 

    }

    else{
        event.respondWith(
            caches.match(event.request).then(function(response){
                return response || fetch(event.request);    
            }));
    }
    

});

