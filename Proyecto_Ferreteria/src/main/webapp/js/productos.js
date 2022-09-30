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
                console.log(result);

                mostrarProductos(parsedResult);
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

                if (path === "productos.html") {
                    mostrarProductos(parsedResult);
                }
                if (path === "admin.html") {
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
            '<h5 class="card-title item-title">' + productos.nombre + '</h5>' +
            '</div>' +
            '<div class="card-body">' +
            '<img src="' + productos.imagen + '" class="card-img-top item-image" alt="">' +
            '<p class="card-text mt-5">' + productos.descripcion + '</p>' +
            '<p class="card-text item-price">Precio Unidad: ' + productos.precioUnidad + '</p>' +
            '<p class="card-text">Stock: ' + productos.cantidad + '</p>' +
            '<div class="container-fluid mt-5 text-center">' +
                '<button class="btn btn-danger addToCart" >Añadir al carrito</button>' +
            '</div>'+
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

function buscarProducto() {
    let producto = $("#product").val();
    document.location.href = "productos.html?product=" + producto;
}

function crearProducto(){
    let nombre = $("#input-nombre-producto").val();
    let cantidad = $("#input-cantidad-producto").val();
    let descripcion = $("#input-descripcion-producto").val();
    let precio = $("#input-precio-producto").val();
    let categoria = $("#list-categoria").find(":selected").val();
    let imagen = $("#input-producto-imagen").val().split('\\').pop();
    
    $.ajax({
            type: "GET",
            dataType: "html",
            url: "./ServletProductoCrear",
            data: $.param({
                nombre: nombre,
                cantidad: cantidad,
                descripcion: descripcion,
                precio: precio,
                categoria: categoria,
                imagen: "media/" + imagen
            }),
            success: function (result) {
                let parsedResult = JSON.parse(result);
                if(parsedResult != false){
                    subirImagen();
                    window.location.replace("admin.html");
                }  
            }
        });
}

async function subirImagen(){
    let formData = new FormData();
    let imagen = $("#input-producto-imagen");
    formData.append("imagen", imagen.get(0).files[0]);
    await fetch('./ServletProductoCrear', {
        method: "POST",
        body: formData,
    });
}
