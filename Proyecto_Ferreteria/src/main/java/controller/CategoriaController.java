/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller;

import beans.Categoria;
import com.google.gson.Gson;
import connection.DBConnection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author edwin
 */
public class CategoriaController implements ICategoriaController {
    @Override
    public String listarCategorias(){
        Gson gson = new Gson();
        DBConnection con = new DBConnection();

        String sql = "SELECT * FROM categorias";
        List<String> listaCategorias = new ArrayList();

        try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                
                int id = rs.getInt("id");
                String nombre = rs.getString("nombre");
                String descripcion = rs.getString("descripcion"); 

                Categoria cat = new Categoria(id, nombre, descripcion);
                listaCategorias.add(gson.toJson(cat));
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());

        } finally {
            con.desconectar();
        }

        return gson.toJson(listaCategorias);
    }
}
