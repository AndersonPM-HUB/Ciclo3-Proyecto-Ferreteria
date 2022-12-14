$(document).ready(function () {
    let path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];

    $(window).ready(function () {
        if (path === "productos.html") {
            getProductos(path);
        }

        iniciarPagina(path);
    });

    $("#form-login").submit(function (event) {
        event.preventDefault();
        autenticarUsuario();
    });

    $("#form-register").submit(function (event) {
        event.preventDefault();
        registrarUsuario();
    });

    $("#busqueda").submit(function (event) {
        event.preventDefault();
        buscarProducto();
    });

    $('#adm-producto').on('click', function (event) {
        event.preventDefault();
        $("#admin-title").html("Lista de productos");
        $("#admin-form").load("component/admin-listar-producto.html");
        getProductos(path);
    });

    $('#adm-categorias').on('click', function (event) {
        event.preventDefault();
        $("#admin-title").html("Lista de categorias");
        $("#admin-form").load("component/admin-listar-categorias.html");
        getProductos(path);
    });

    $('#adm-form').ready(function () {
        $('#btn-crear-producto').on('click', function (event) {
            event.preventDefault();
            $("#admin-title").html("Crear producto");
            $("#admin-form").load("component/admin-crear-producto.html");
        });

        $('#btn-crear-categoria').on('click', function (event) {
            event.preventDefault();
            $("#admin-title").html("Crear categoria");
            $("#admin-form").load("component/admin-crear-categorias.html");
        });
    });

    $("#admin-lista-productos").on("click", function (event) {
        let productoId = event.target.id;
        if (productoId != "") {
            confirmacionEliminarProducto(productoId);
        }
    });

});

function iniciarPagina(path) {
    if (getCookie('state')) {
        if (JSON.parse(getCookie('user_inf')).rol === 1) {
            $("#ferr-navbar").load("component/navbar-admin.html");
        } else {
            $("#ferr-navbar").load("component/navbar-user.html");

        }

        if (path === "register.html" || path === "login.html") {
            document.location.replace("index.html");
        }
    } else {
        $("#ferr-navbar").load("component/navbar-login.html");
    }

    try {
        if (JSON.parse(getCookie('user_inf')).rol !== 1 && path === "admin.html") {
            document.location.replace("index.html");
        }
    } catch (Excepction) {
        if (path === 'admin.html') {
            document.location.replace("index.html");
        }
    }
}