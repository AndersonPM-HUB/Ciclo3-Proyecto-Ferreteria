package controller;

import beans.Producto;
import com.google.gson.Gson;
import connection.DBConnection;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ProductosController implements IProductosController {

    @Override
    public String listarProductos() {

        Gson gson = new Gson();
        DBConnection con = new DBConnection();

        String sql = "SELECT * FROM productos";
        //arreglo para guardar esto 
        List<String> listaProductos = new ArrayList();

        try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                
                int id = rs.getInt("id");
                String nombre = rs.getString("nombre");
                int cantidad = rs.getInt("cantidad");
                String descripcion = rs.getString("descripcion");
                double precio = rs.getDouble("precio_unidad");
                String imagen = rs.getString("imagen");

                Producto p = new Producto(id, nombre, cantidad, descripcion, precio, imagen);
                // System.out.println(p);
                listaProductos.add(gson.toJson(p));
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());

        } finally {
            con.desconectar();
        }

        return gson.toJson(listaProductos);
    }

    @Override
    public String buscarProducto(String producto) {
        Gson gson = new Gson();
        DBConnection con = new DBConnection();

        //busqueda efectiva 
        String palabra = producto.toUpperCase().charAt(0) + producto.substring(1, producto.length()).toLowerCase();
        String sql = "SELECT * FROM productos WHERE nombre LIKE '"+ palabra +"%'";
        System.out.println(sql);
        //arreglo para guardar esto 
        List<String> listaProductos = new ArrayList();

        try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {

                String nombre = rs.getString("nombre");
                int cantidad = rs.getInt("cantidad");
                String descripcion = rs.getString("descripcion");
                double precio = rs.getDouble("precio_unidad");
                String imagen = rs.getString("imagen");

                Producto p = new Producto(nombre, cantidad, descripcion, precio, imagen);

                System.out.println(p);

                listaProductos.add(gson.toJson(p));
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());

        } finally {
            con.desconectar();
        }

        return gson.toJson(listaProductos);

    }
    
    @Override
    public String crearProducto(String nombre, Integer cantidad, String descripcion, Double precio,
            Integer categoria, String imagen) {
        
        Gson gson = new Gson();
        DBConnection con = new DBConnection();
        int idProducto = 0;
        String sql = "INSERT INTO productos (nombre, cantidad, descripcion, precio_unidad, imagen) VALUES('" + nombre + "', '" + cantidad + "', '" + descripcion
                + "', '" + precio + "', '" + imagen + "')";
        String sql_two = "SELECT id FROM productos WHERE nombre ='" + nombre + "' AND cantidad='" + cantidad + "' AND descripcion='" + descripcion + "'";
        System.out.println(sql_two);
        try {
            Statement st = con.getConnection().createStatement();
            st.executeUpdate(sql);
            
            ResultSet rs = st.executeQuery(sql_two);
            while(rs.next()){
                idProducto = rs.getInt("id");
            }
            
            sql = "INSERT INTO categorias_productos(id_categoria, id_producto) VALUES('" + categoria + "', '" + idProducto + "')";
            st.executeUpdate(sql);
            
            Producto producto = new Producto(idProducto, nombre, cantidad, descripcion, precio, imagen);
            st.close();
            return gson.toJson(producto);

        } catch (Exception ex) {
            System.out.println(ex.getMessage());

        } finally {
            con.desconectar();
        }

        return "false";
}

    @Override
    public String listarProductosPorCategoria(int idCategoria) {
       Gson gson = new Gson();
        DBConnection con = new DBConnection();

        String sql = "SELECT p.id,p.nombre,p.cantidad,p.descripcion,p.precio_unidad,p.imagen \n" +
                    "FROM categorias_productos AS ct \n" +
                    "INNER JOIN productos AS p ON ct.id_producto = p.id\n" +
                    "INNER JOIN categorias AS c ON  ct.id_categoria = c.id\n" +
                    "WHERE ct.id_categoria ='"+ idCategoria+ "'" +
                    "GROUP BY p.id";
        //arreglo para guardar esto 
        List<String> listaProductos = new ArrayList();

        try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                
                int id = rs.getInt("id");
                String nombre = rs.getString("nombre");
                int cantidad = rs.getInt("cantidad");
                String descripcion = rs.getString("descripcion");
                double precio = rs.getDouble("precio_unidad");
                String imagen = rs.getString("imagen");

                Producto p = new Producto(id, nombre, cantidad, descripcion, precio, imagen);
                // System.out.println(p);
                listaProductos.add(gson.toJson(p));
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());

        } finally {
            con.desconectar();
        }

        return gson.toJson(listaProductos);
    }
}
