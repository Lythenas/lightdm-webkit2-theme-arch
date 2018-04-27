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
    console.log("onload with user: " + user);
    console.log(JSON.stringify(lightdm));
}

function authenticate(password) {
    lightdm.start_authentication(user);
    console.log("sent user: \"" + user + "\"");
    respond(password);
    input.value = "";
}

function respond(password) {
    setTimeout(function() {
        if (lightdm.in_authentication) {
            lightdm.respond(password);
        } else {
            respond(password);
        }
    }, 100);
}
