$(document).ready(function () {
    $("#list-categoria").ready(function () {
        getCategorias(0);
    });

    $("#form-crear-producto").submit(function (event) {
        event.preventDefault();
        crearProducto();
    });

    $("#form-crear-categoria").submit(function (event) {
        event.preventDefault();
        crearCategoria();
    });

    $("#admin-lista-categorias").ready(function () {
        getCategorias(1)
    });

    $("#admin-lista-categorias").on("click", function (event) {
        let categoriaId = event.target.id;
        if (categoriaId != "") {
            confirmacionEliminarCategoria(categoriaId);
        }
    });
});

function getCategorias(val) {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCategoriasListar",
        data: $.param,
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                if (val === 0) {
                    listaCategorias(parsedResult);
                }
                if (val === 1) {
                    mostrarCategorias(parsedResult);
                }
            }

        }
    });
}

function listaCategorias(categorias) {
    let contenido = "";
    contenido += '<option value="0">Selecciona una categoria...</option>';
    $.each(categorias, function (index, categoria) {
        categorias = JSON.parse(categoria);
        contenido += '<option value="' + categorias.id + '">' + categorias.nombre + '</option>';
    });
    $("#list-categoria").html(contenido);
}

function mostrarCategorias(categorias) {
    let contenido = ""
    let contador = 1;
    $.each(categorias, function (index, categoria) {
        categoria = JSON.parse(categoria);
        contenido += '<tr id="row-' + categoria.id + '">' +
                '<th scope="row">' + contador + '</th>' +
                '<td>' + categoria.nombre + '</td>' +
                '<td>' + categoria.descripcion + '</td>' +
                '<td id="eliminarProducto"><a id="' + categoria.id + '" class="btn btn-outline-danger btn-sm">Eliminar</a></td>' +
                '</tr>';
        contador += 1;
    });

    $("#admin-lista-categorias").html(contenido);
}

function crearCategoria() {
    let nombre = $("#input-nombre-categoria").val();
    let descripcion = $("#input-descripcion-categoria").val();

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCategoriaCrear",
        data: $.param({
            nombre: nombre,
            descripcion: descripcion,
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                successRelocate();
            }
        }
    });
}

function eliminarCategoria(idCategoria) {
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCategoriaEliminar",
        data: $.param({
            id: idCategoria
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                $("#row-" + idCategoria).remove();
                Swal.fire('¡El registro ha sido elimindo!', '', 'success');
            }
        }
    });
}


function successRelocate() {
    Swal.fire({
        title: '¡El registro ha sido agregado!',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
            confirmButton: 'bg-danger',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("admin.html");
        }
    });
}

function confirmacionEliminarCategoria(idCategoria) {
    Swal.fire({
        title: '¿Estás seguro que quieres eliminar esta categoria?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        icon: 'warning',
        customClass: {
            confirmButton: 'bg-danger',
            cancelButton: 'bg-dark'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarCategoria(idCategoria);
        }
    })
}
