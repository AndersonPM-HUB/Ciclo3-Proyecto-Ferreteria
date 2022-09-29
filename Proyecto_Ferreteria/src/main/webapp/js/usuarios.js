$(window).ready(function(){
    if (getCookie('state')) {
        try {
            $(".username-nav").html(JSON.parse(getCookie('user_inf')).nombres);
        } catch (TypeError) {
            console.log("Error al cargar datos de usuario...");
        }
    }
});

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
                console.log(parsedResult);
                document.location.href = "index.html";
            } else {
                $("#login-error").removeClass("d-none");
            }
        }
    });
}

function cerrarSesion() {
    if (getCookie('state')) {
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