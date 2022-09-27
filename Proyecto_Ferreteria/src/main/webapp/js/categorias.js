$(document).ready(function (){
    $("#list-categoria").ready(function(){
       getCategorias();
    });
    
    $("#form-crear-producto").submit(function (event){
        event.preventDefault();
        crearProducto();
        subirImagen();
    });
});

function getCategorias(){
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCategoriasListar",
        data: $.param,
        success: function (result) {
            let parsedResult = JSON.parse(result);
            listaCategorias(parsedResult);
        }
    });
}

function listaCategorias(categorias){
    let contenido = "";
    contenido += '<option value="0">Selecciona una categoria...</option>';
    $.each(categorias, function(index, categoria){
        categorias = JSON.parse(categoria);
        contenido += '<option value="' + categorias.id + '">' + categorias.nombre + '</option>';
    });
    $("#list-categoria").html(contenido);
}

