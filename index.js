console.log("working");

if('serviceWorker' in navigator ){
    navigator.serviceWorker.register('/sw.js').then(function(registration){
        console.log("registration successful", registration.scope );
        }).catch(function(err){
            console.log('not working' ,err);
        });
}




function getdata(){
    console.log('testing');
    fetch("https://api.github.com/users/shahfahad194").then(function(response){
        return response.json();

    }).then(function(users){
        console.log('data from network:',users);
        var nm= users.name;
        var id=users.id;
        document.getElementById("myP").innerHTML = +'Name'+nm +'<br>Id:'+ id;
    }).catch(function(error){
        console.log('error');

    })


caches.match("https://api.github.com/users/shahfahad194").then(function(response){
    if(!response){
        console.log("no data cache");
    }
    return response.json();

    }).then(function(data){
        console.log('data from cache:',data);
    })
    .catch(function(error){
        console.log("error");
    })

}