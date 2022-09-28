/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package servlets;

import controller.ProductosController;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 *
 * @author edwin
 */
@WebServlet(name = "ServletProductoCrear", urlPatterns = {"/ServletProductoCrear"})
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024 * 1,
    maxFileSize = 1024 * 1024* 10,
    maxRequestSize = 1024 * 1024 * 100
)
public class ServletProductoCrear extends HttpServlet {
    
    public ServletProductoCrear(){
        super();
    }
 
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ProductosController producto = new ProductosController();
        
        String nombre = request.getParameter("nombre");
        Integer cantidad = Integer.parseInt(request.getParameter("cantidad"));
        String descripcion = request.getParameter("descripcion");
        Double precio = Double.parseDouble(request.getParameter("precio"));
        Integer categoria = Integer.parseInt(request.getParameter("categoria"));
        String imagen = request.getParameter("imagen");
        
        
        String result = producto.crearProducto(nombre, cantidad, descripcion, precio, categoria, imagen);

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(result);
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Part filePart = request.getPart("imagen");
        String fileName = filePart.getSubmittedFileName();
        String path = request.getServletContext().getRealPath("/media") + "\\" + fileName;
        for(Part part : request.getParts()){
            part.write(path);
        }
        response.getWriter();
    }

}
