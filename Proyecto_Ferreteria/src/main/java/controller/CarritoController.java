package controller;

import beans.Carrito;
import beans.Producto;
import com.google.gson.Gson;
import controller.ProductosController;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;

public class CarritoController implements ICarritoController {

    @Override
    public String agregarProducto(int idProducto, HttpSession s) {
        Gson gson = new Gson();

        try {
            Carrito c = new Carrito();

            if (s.getAttribute("CarritoCompra") == null) {
                s.setAttribute("CarritoCompra", c);
            }
            ProductosController p = new ProductosController();
            Producto producto = p.traerProducto(idProducto);
            producto.setCantidad(1);
            Carrito carritoSesion = (Carrito) s.getAttribute("CarritoCompra");
            carritoSesion.agregarProducto(producto);
            return gson.toJson(carritoSesion.getListaProductos());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return "false";

    }

    @Override
    public String eliminarProducto(int idProducto, HttpSession s) {

        try {
            Carrito carrito = (Carrito) s.getAttribute("CarritoCompra");

            if (carrito != null) {
                boolean rta = carrito.eliminarProducto(idProducto);
                return String.valueOf(rta);
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return "false";

    }

    @Override
    public String vaciarCarrito(HttpSession s) {

        try {
            Carrito carrito = (Carrito) s.getAttribute("CarritoCompra");

            if (carrito != null) {
                s.removeAttribute("CarritoCompra");
                return "true";
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return "false";

    }

    @Override
    public String confirmarCompra() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public String listarCarrito(HttpSession s) {
        Gson gson = new Gson();
        Carrito carrito = (Carrito) s.getAttribute("CarritoCompra");
        if (carrito != null) {
            return gson.toJson(carrito.getListaProductos());
        }
        return "false";
    }
}
