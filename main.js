// Put your username here!!!
var user = "username";
var input = document.getElementById("input");
var message = document.getElementById("message");

input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        authenticate(e.target.value);
    }
});

window.authentication_complete = function() {
    if (lightdm.is_authenticated) {
        console.log("Authenticated!");
        //message.innerHTML += "<br>Authenticated!";
        $( 'body' ).fadeOut( 1000, () => {
            lightdm.login(lightdm.authentication_user, null);
        } );
    }
}

function pad(a, b) {
    return (1e15 + a + "").slice(-b);
}

function getImg() {
    index = Math.floor(Math.random() * 25);
    console.log(pad(index,2));
    document.getElementsByTagName('body')[0].style.backgroundImage = 
        "url(wallpapers/" + pad(index, 2) + ".png)";
}

window.onload = function() {
    getImg();
    input.focus();
    input.select();
    //message.innerHTML += "<br>onload with user: " + user;
}

function authenticate(password) {
    //message.innerHTML += "<br>got password: " + password;

    lightdm.start_authentication(user);
    //message.innerHTML += "<br>sent user: \"" + user + "\"";

    setTimeout(function() {
        lightdm.respond(password);
        //message.innerHTML += "<br>sent password: \"" + password + "\"";
    }, 100);

    input.value = "";
}
