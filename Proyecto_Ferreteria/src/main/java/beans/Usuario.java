
package beans;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Usuario {
    private String usuario;
    private String nombres;
    private String apellidos;
    private String correo;
    private String contrasena;

    public Usuario(String usuario, String nombres, String apellidos, String correo, String contrasena) {
        this.usuario = usuario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    
    public static String bytesToHex(byte[] bytes){
        StringBuilder sb = new StringBuilder();
        for(byte b : bytes){
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public static String encriptarContrasena(String contrasena) throws UnsupportedEncodingException, NoSuchAlgorithmException{
        byte[] contrasenaBytes = contrasena.getBytes("UTF-8");
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hashContrasena = md.digest(contrasenaBytes);
        String hashHex = bytesToHex(hashContrasena);
        return hashHex;
    }
    
    @Override
    public String toString() {
        return "Usuario{" + "usuario=" + usuario + ", nombres=" + nombres + ", apellidos=" + apellidos + ", correo=" + correo + ", contrasena=" + contrasena + '}';
    }
    
}
