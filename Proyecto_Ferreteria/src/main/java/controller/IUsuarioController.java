
package controller;

public interface IUsuarioController {
    public String login(String user, String contrasena);
    public String register(String user, String nombres, String apellidos, String correo, 
            String contrasena);
}
