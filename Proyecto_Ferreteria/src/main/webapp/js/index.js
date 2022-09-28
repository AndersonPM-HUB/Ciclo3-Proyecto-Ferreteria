$(document).ready(function () {
    
    let path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];

    $(window).ready(function () {
        if (getCookie('state')) {
            if(JSON.parse(getCookie('user_inf')).usuario === "admin"){
                $("#ferr-navbar").load("component/navbar-admin.html");
            }else{
                $("#ferr-navbar").load("component/navbar-user.html");
            }
            
            if(path === "register.html" || path === "login.html") {
                document.location.replace("index.html");  
            }
        } else {
            $("#ferr-navbar").load("component/navbar-login.html");
        }
        
        try{
            if(JSON.parse(getCookie('user_inf')).usuario !== "admin" && path === "admin.html"){
              document.location.replace("index.html");
            }  
        }catch(Excepction){
            if(path === 'admin.html'){
                document.location.replace("index.html");
            }
        }
        
    });
    
    $(window).ready( function () {
        if (getCookie('state')) {
            try {
                $(".username-nav").html(JSON.parse(getCookie('user_inf')).usuario);
            } catch (TypeError) {
                console.log("Error al cargar datos de usuario...");
            }
        }

        if (path === "productos.html") {
            getProductos(path);
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


    $('#adm-producto').on('click', function(event){
        event.preventDefault();
        $("#admin-title").html("Lista de productos");
        $("#admin-form").load("component/admin-listar-producto.html");
        getProductos(path);
    });
    
    $("#busqueda").submit(function (event) {
        event.preventDefault();
        buscarProducto();

    });

    $('#adm-form').ready(function(){
        $('#btn-crear-producto').on('click', function(event){
            event.preventDefault();
            $("#admin-title").html("Crear producto");
            $("#admin-form").load("component/admin-crear-producto.html");
        });
    });

});



function getProductos(path) {

    let queryString = window.location.search;
    let busqueda;
    let producto;
    try {
        queryString = queryString.split('?');
        queryString = queryString[1].split('=');
        busqueda = queryString[0];
        producto = queryString[1];

    } catch (e) {
        busqueda = "";
        producto = "";
    }


    if (busqueda === "product") {
        
        $.ajax({
            type: "GET",
            dataType: "html",
            url: "./ServletProductoBuscar",
            data: $.param({
                product: producto
            }),
            success: function (result) {
                let parsedResult = JSON.parse(result);
                
                mostrarProductos(parsedResult);
            },
            error: function  (result){
                $('#mensaje-busqueda').html("<p>No se encotraron busquedas</p>");
            }
            
        });
    } else {
       $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletProductosListar",
        data: $.param,
        success: function (result) {
            let parsedResult = JSON.parse(result);
            
            if(path === "productos.html"){
                mostrarProductos(parsedResult);
            }
            if(path === "admin.html"){
                listarProductos(parsedResult);
            }
        }
            
              

       
    });

    }
    }
    

function mostrarProductos(productos) {
    let contenido = "";
    let contador = 0;
    let cards = 0;
    $.each(productos, function (index, producto) {

        productos = JSON.parse(producto);

        if (contador === 0 || contador % 3 === 0) {
            cards = 0
            contenido += '<div class="row justify-content-center">';
        }

        contenido += '<div class="card">' +
                '<div class="card-header">' +
                '<h5 class="card-title">' + productos.nombre + '</h5>' +
                '</div>' +
                '<div class="card-body">' +
                '<img src="' + productos.imagen + '" class="card-img-top" alt="">' +
                '<p class="card-text">' + productos.descripcion + '</p>' +
                '<p class="card-text">Precio Unidad:' + productos.precioUnidad + '</p>' +
                '<p class="card-text">Stock :' + productos.cantidad + '</p>' +
                '<a href="#" class="btn btn-danger" >Añadir al carrito</a>' +
                '</div>' +
                '<div class="card-footer text-center text-muted">' +
                '</div>' +
                '</div> ';

        cards += 1
        if (cards === 3) {
            contenido += '</div>';
        }

        contador += 1;
    });
    contenido += '<script src="js/paginacion.js"></script>';
    $("#tarjetas-productos").html(contenido);
}


function listarProductos(productos) {
    let contenido = "";
    let contador = 1;
    $.each(productos, function (index, producto) {
        console.log(producto);
        productos = JSON.parse(producto);   
        
        contenido += '<tr>' +
        '<th scope="row">' + contador + '</th>' +
        '<td>' + productos.nombre + '</td>' +
        '<td>' + productos.descripcion + '</td>' +
        '<td>' + productos.cantidad + '</td>' +
        '<td>' + productos.precioUnidad + '</td>' +
        '<td><a id="editar-producto" class="btn btn-outline-warning btn-sm">Editar</a></td>' +
        '<td><a id="borrar-producto" class="btn btn-outline-danger btn-sm">Eliminar</a></td>' +
        '</tr>';
        contador += 1;
    });
    $("#admin-lista-productos").html(contenido);
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

// Autor Vignesh Pichamani StackOverFlow
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
}

// Autor Vignesh Pichamani StackOverFlow
function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

// Autor Vignesh Pichamani StackOverFlow
function eraseCookie(key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, '-1');
}

function buscarProducto() {

    let producto = $("#product").val();
    document.location.href = "productos.html?product=" + producto;

}

