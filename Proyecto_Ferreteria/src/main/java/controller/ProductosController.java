
package controller;

import beans.Producto;
import beans.Usuario;
import com.google.gson.Gson;
import connection.DBConnection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


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
               
                String nombre = rs.getString("nombre");
                int cantidad = rs.getInt("cantidad");
                String descripcion = rs.getString("descripcion");
                double precio = rs.getDouble("precio_unidad"); 
                String imagen = rs.getString("imagen");
                
                Producto p = new Producto(nombre, cantidad, descripcion, precio); 
                
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
}



