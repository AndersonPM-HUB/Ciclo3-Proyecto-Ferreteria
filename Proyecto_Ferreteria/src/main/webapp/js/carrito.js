
$(document).ready(function () {

    $(window).ready(function () {
        cargarCarrito(); 
    });


});

function añadirProducto(id) {
    
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCarritoAgregar",
        data: $.param({
            idProducto: id,
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {

                console.log("Producto añaido", parsedResult)
                //TODO  SWEET ALERT 
            }
        }
    });
}



function cargarCarrito() {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletListarCarrito",
        data: $.param,
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {

                mostrarCarrito(parsedResult);
            }
        }
    });
}



function mostrarCarrito(listaProductos) {

    let contenidoNombre = "";
    let contenidoPrecio = "";
    let contenidoCantidad = "";
    let contenidoTotal = "";
    console.log(listaProductos); 
    $.each(listaProductos, function (index, producto) {

        contenidoNombre += "<p>" + producto.nombre + "</p>";
        contenidoPrecio += "<p>" + producto.precioUnidad + "</p>";
        contenidoCantidad += "<p>" + producto.cantidad + "</p>";
        contenidoTotal += "<p>" + (producto.precioUnidad * producto.cantidad) + "</p>";

    });

    $('#carrito-producto-nombre').html(contenidoNombre);
    $('#carrito-producto-precio').html(contenidoPrecio);
    $('#carrito-producto-cantidad').html(contenidoCantidad);
    $('#carrito-producto-total').html(contenidoTotal);
}