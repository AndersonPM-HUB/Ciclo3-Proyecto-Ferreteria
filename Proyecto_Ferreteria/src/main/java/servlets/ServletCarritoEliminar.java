/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import controller.CarritoController;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Lenovo
 */
@WebServlet(name = "ServletCarritoEliminar", urlPatterns = {"/ServletCarritoEliminar"})
public class ServletCarritoEliminar extends HttpServlet {

    public ServletCarritoEliminar() {
        super(); 
    }

    

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        CarritoController carrito = new CarritoController(); 
        
        HttpSession session = request.getSession();
        
        int id = Integer.parseInt(request.getParameter("idProducto")); 
        
        String rta = carrito.eliminarProducto(id,session); 
        
        System.out.println(rta);
        PrintWriter out = response.getWriter();
        out.println(rta);
        out.flush();
        out.close();
    }

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

   

}
