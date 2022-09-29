/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package controller;

/**
 *
 * @author Lenovo
 */
public interface IProductosController {
    
    public String listarProductos(); 
    
    public String buscarProducto(String producto);
    
    public String crearProducto(String nombre, Integer cantidad, String descripcion, Double precio,
            Integer categoria, String imagen);
    
    public String eliminarProducto(int idProducto, String path);
}
