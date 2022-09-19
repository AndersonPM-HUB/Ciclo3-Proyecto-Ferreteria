$(document).ready(function(){
    $(window).ready(function(){
        $("#ferr-navbar").load("component/navbar.html");
    });

    $(window).on('load', function(){
        if (getCookie('state')){
            if(window.location.pathname === "/register.html" || window.location.pathname === "/login.html"){
                document.location.href = "index.html";
            }
            removeCls([".user-dropdown"], "d-none", true);
        } else {
            removeCls([".login-item", ".register-item"], "d-none", false);
        }
    });

    $("#form-login").submit(function (event) {
        event.preventDefault();
        autenticarUsuario();
    });

    $("#form-register").submit(function (event) {
        event.preventDefault();
        registrarUsuario();
    }); 

});

async function removeCls(items, prop, user){
    await items.forEach(function(item){
        $(item).removeClass(prop);
    });
    if (user){
        try{
            await $(".username-nav").html(JSON.parse(getCookie('user_inf')).usuario);
        }catch(TypeError){
            console.log("Error al cargar datos de usuario...")
        }     
    }
}

function autenticarUsuario() {
    let usuario = $("#usuario").val();
    let contrasena = $("#contrasena").val();
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioLogin",
        data: $.param({
            usuario: usuario,
            contrasena: contrasena
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                $("#login-error").addClass("d-none");
                setCookie('state', true, '1');
                setCookie('user_inf', JSON.stringify(parsedResult), '1');                
                document.location.href = "index.html";
            } else {
                $("#login-error").removeClass("d-none");
            }
        }
    });
}

function cerrarSesion(){
    if(getCookie('state')){
        eraseCookie('state');
        eraseCookie('user_inf');
        document.location.href = "login.html";
    }
}

function registrarUsuario() {
    let usuario = $("#input-usuario").val();
    let contrasena = $("#input-contrasena").val();
    let contrasenaConfirmacion = $("#input-contrasena-repeat").val();
    let nombres = $("#input-nombres").val();
    let apellidos = $("#input-apellidos").val();
    let correo = $("#input-correo").val();

    if (contrasena == contrasenaConfirmacion) {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: "./ServletUsuarioRegister",
            data: $.param({
                usuario: usuario,
                contrasena: contrasena,
                nombres: nombres,
                apellidos: apellidos,
                correo: correo,
            }),
            success: function (result) {
                let parsedResult = JSON.parse(result);
                console.log(parsedResult);
                if (parsedResult != false) {
                    $("#register-error").addClass("d-none");
                    document.location.href = "index.html";
                } else {
                    $("#register-error").removeClass("d-none");
                    $("#register-error").html("Error en el registro del usuario");
                }
            }
        });
    } else {
        $("#register-error").removeClass("d-none");
        $("#register-error").html("Las contraseñas no coinciden");
    }
}

// Autor Vignesh Pichamani StackOverFlow
function setCookie(key, value, expiry){
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
}

// Autor Vignesh Pichamani StackOverFlow
function getCookie(key){
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

// Autor Vignesh Pichamani StackOverFlow
function eraseCookie(key){
    var keyValue = getCookie(key);
    setCookie(key, keyValue, '-1');
}