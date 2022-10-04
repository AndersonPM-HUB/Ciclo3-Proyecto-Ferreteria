
package controller;

import beans.Producto;
import javax.servlet.http.HttpSession;


public interface ICarritoController {
    
    
    public String agregarProducto(int idProducto, HttpSession s); 
    public String eliminarProducto(int idProducto , HttpSession s); 
    public String vaciarCarrito(HttpSession s); 
    public String confirmarCompra(); 
    public String listarCarrito(HttpSession s); 
    
}
