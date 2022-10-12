
package connection;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    Connection connection;
//    static String db = "ferreteria";
//    static String port = "3306";   /* El puerto de la base de datos 3307 */
//    static String login = "root";
//    static String password = "admin";
    
    static String db = "railway";
    static String port =  "6751";
    static String login = "root";
    static String password = "uB8whzaQ5pHr4GRDa7gZ";   
    static String ip = "containers-us-west-89.railway.app"; 
    
    public DBConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://"+DBConnection.ip +":"+DBConnection.port+ "/"+DBConnection.db;
            
            connection = DriverManager.getConnection(url, DBConnection.login, DBConnection.password);
            System.out.println("Conexion exitosa");
        } catch (Exception ex) {
            System.out.println("Error en la conexion " + ex);
        }
    }

    public Connection getConnection() {
        return connection;
    }
    
    public void desconectar(){
        connection = null;
    }
    
}
