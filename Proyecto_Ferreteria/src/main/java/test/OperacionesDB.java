package test;


import beans.Producto;
import connection.DBConnection;
import java.sql.ResultSet;
import java.sql.Statement;


public class OperacionesDB {
    
    public static void main(String[] args) {
        listarProducto();
        //actualizarProducto(1,"Martillo");
    }
    
    public static void actualizarProducto(int id, String producto){
        DBConnection con = new DBConnection();
        String sql = "UPDATE productos SET nombre = '" + producto + "' WHERE id = " + id;
        try {
        Statement st = con.getConnection().createStatement();
        st.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        finally{
            con.desconectar();
        }
        
    }
    
    public static void listarProducto(){
        DBConnection con = new DBConnection();
        String sql = "SELECT * FROM productos LIMIT 100;";
        try {
        Statement st = con.getConnection().createStatement();
        ResultSet rs = st.executeQuery(sql);
        while (rs.next()){
            String nombre = rs.getString("nombre");
            int cantidad = rs.getInt("cantidad");
            String descripcion = rs.getString("descripcion");
            Double precioUnidad = rs.getDouble("precio_unidad");
            
            Producto pr = new Producto(nombre, cantidad, descripcion, precioUnidad);
            System.out.println(pr.toString());
        }
        st.executeQuery(sql);
        
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        finally{
            con.desconectar();
        }
        
    }
    
    
    
}
