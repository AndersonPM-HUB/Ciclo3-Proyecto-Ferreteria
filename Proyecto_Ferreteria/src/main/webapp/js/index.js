$(document).ready(function () {

    $("#form-login").submit(function (event) {
        event.preventDefault();
        autenticarUsuario();
    });

    $("#form-register").submit(function (event) {
        event.preventDefault();
        registrarUsuario();
    });


});

function autenticarUsuario() {

    let usuario = $("#usuario").val();
    let contrasena = $("#contrasena").val();
    console.log(usuario);
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
            console.log(parsedResult);
            if (parsedResult != false) {
                $("#login-error").addClass("d-none");
                let username = parsedResult['usuario'];
                // document.location.href = "index.html?usuario=" + username;
            } else {
                $("#login-error").removeClass("d-none");
            }
        }
    });
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

                if (parsedResult != false) {
                    $("#register-error").addClass("d-none");
                    let username = parsedResult['usuario'];
                    document.location.href = "index.html?username=" + username;
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