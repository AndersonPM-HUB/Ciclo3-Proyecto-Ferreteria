/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

/**
 *
 * @author edwin
 */
public interface ICategoriaController {
    public String listarCategorias();
    public String crearCategoria(String nombre, String descripcion);
    public String eliminarCategoria(int idCategoria);
}
