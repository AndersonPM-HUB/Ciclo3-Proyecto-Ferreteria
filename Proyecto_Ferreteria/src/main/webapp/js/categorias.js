$(document).ready(function (){
    $("#list-categoria").ready(function(){
       getCategorias();
    });
    
    $("#form-crear-producto").submit(function (event){
        event.preventDefault();
        crearProducto();
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
            mostrarCategorias(parsedResult);
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

function mostrarCategorias(categorias){

    let contenido = "";
    $.each(categorias, function(index, categoria){
        categorias = JSON.parse(categoria);
      
        contenido += '<li><a href="#" class="nav-link scrollto active"  onclick="categoriaBuscar(' +categorias.id+ ');"><span>' + categorias.nombre+ '</span></a></li><br>' ;
    });
    $("#categorias-lista").html(contenido);
    
}

  
function categoriaBuscar(id){
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCategoriasProductos",
        data: $.param({
                id: id
            }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            console.log(parsedResult);
            if(result.length != 4){
                
       
                mostrarProductos(parsedResult);
                }else{
                   Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se encontro categoria!',
                   
                });}
    }
    });
}