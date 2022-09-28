
package controller;

import java.sql.ResultSet;
import java.sql.Statement;
import beans.Usuario;
import connection.DBConnection;
import com.google.gson.Gson;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UsuarioController implements IUsuarioController{
    
    @Override
    public String login(String user, String contrasena){
        Gson gson = new Gson();
        DBConnection con = new DBConnection();
        
        String sql = "";
        try {
            sql = "SELECT * FROM usuarios WHERE usuario = '" +  user + "' or correo = '" + user + "'and contrasena = '" + Usuario.encriptarContrasena(contrasena.strip()) + "'";
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()){
                String nombres = rs.getString("nombres");
                String apellidos = rs.getString("apellidos");
                String correo = rs.getString("correo");
                int rol = rs.getInt("rol");
                Usuario usuario = new Usuario(user, nombres, apellidos, correo, rol, Usuario.encriptarContrasena(contrasena.strip()));
                return gson.toJson(usuario);
            }
        
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            
        }finally{
            con.desconectar();
        }
        
        return "false";
    }
    
    @Override
    public String register(String user, String nombres, String apellidos, String correo, String contrasena) {
        Gson gson = new Gson();
        DBConnection con = new DBConnection();

        String sql = "";
        try {
            sql = "INSERT INTO usuarios (usuario, nombres, apellidos, correo, contrasena) VALUES('" + user + "', '" + nombres + "', '" + apellidos
                    + "', '" + correo + "', '" + Usuario.encriptarContrasena(contrasena.strip()) + "')";
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(UsuarioController.class.getName()).log(Level.SEVERE, null, ex);
        }

        try {
            Statement st = con.getConnection().createStatement();
            st.executeUpdate(sql);

            Usuario usuario = new Usuario(user, nombres, apellidos, correo, Usuario.encriptarContrasena(contrasena.strip()));
            st.close();
            return gson.toJson(usuario);

        } catch (Exception ex) {
            System.out.println(ex.getMessage());

        } finally {
            con.desconectar();
        }

        return "false";
    }
}

