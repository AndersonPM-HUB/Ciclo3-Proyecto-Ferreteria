
package servlets;

import controller.ProductosController;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Lenovo
 */
@WebServlet(name = "ServletProductoBuscar", urlPatterns = {"/ServletProductoBuscar"})
public class ServletProductoBuscar extends HttpServlet {

    public ServletProductoBuscar() {
        super();
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        ProductosController p = new ProductosController(); 
        
        String productoBuscar= request.getParameter("product");
        String pstr = p.buscarProducto(productoBuscar);
        System.out.println(pstr);
        PrintWriter out = response.getWriter();
        out.println(pstr);
        out.flush();
        out.close();
       
    }

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

   
}
