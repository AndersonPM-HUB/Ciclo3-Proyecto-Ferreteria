$(document).ready(function () {
    $(window).ready(function () {
        cargarCarrito(); 
    });
    
    $("#carrito-vaciar").on("click", function(event){
        event.preventDefault();
        vaciarCarrito();
    })
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
                console.log("Producto añadido", parsedResult)
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer),
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                Toast.fire({
                   icon: 'success',
                   title: '¡Producto agregado con éxito!'
                });
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
                for (let i = 1; i <= 5; i++){
                  $("#carrito-label-" + i).removeClass("d-none");  
                }
                $("#cart-alert").addClass("d-none");
                mostrarCarrito(parsedResult);
            }else{
                console.log("Test")
            }
        }
    });
}

function vaciarCarrito(){
     $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCarritoVaciar",
        data: $.param,
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                window.location.reload();
            }
        }
    });
}

function borrarProducto(id){
     $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCarritoEliminar",
        data: $.param({
            idProducto: id,
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                window.location.reload();
            }
        }
    });
}

function mostrarCarrito(listaProductos) {
    let contenidoNombre = "";
    let contenidoPrecio = "";
    let contenidoCantidad = "";
    let contenidoTotal = "";
    let contenidoBoton = "";
    let totalProductos = 0;
    
    $.each(listaProductos, function (index, producto) {

        contenidoNombre += "<p>" + producto.nombre + "</p></br>";
        contenidoPrecio += "<p>$ " + producto.precioUnidad + "</p></br>";
        contenidoCantidad += "<p>" + producto.cantidad + "</p></br>";
        contenidoTotal += "<p>$ " + (producto.precioUnidad * producto.cantidad) + "</p></br>";
        contenidoBoton += '<p><a href="javascript:void(0)" class="btn btn-danger" onclick="confEliminar('+producto.id+')">x</a></p>';
        totalProductos += producto.precioUnidad * producto.cantidad;
    });

    $('#carrito-producto-nombre').html(contenidoNombre);
    $('#carrito-producto-precio').html(contenidoPrecio);
    $('#carrito-producto-cantidad').html(contenidoCantidad);
    $('#carrito-producto-total').html(contenidoTotal);
    $('#carrito-borrar-producto').html(contenidoBoton);
    $('#carrito-total-compra').html("$ " + totalProductos);
}

function confEliminar(idProducto) {
    Swal.fire({
        title: '¿Estás seguro que quieres eliminar este producto del carrito?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        icon: 'warning',
        customClass: {
            confirmButton: 'bg-danger',
            cancelButton: 'bg-dark'
        }
    }).then((result) => {
        if (result.isConfirmed) {
           borrarProducto(idProducto);
        }
    })
}