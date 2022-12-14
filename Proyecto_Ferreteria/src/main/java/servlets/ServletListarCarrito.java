
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


@WebServlet(name = "ServletListarCarrito", urlPatterns = {"/ServletListarCarrito"})
public class ServletListarCarrito extends HttpServlet {

    public ServletListarCarrito() {
        super(); 
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       
        CarritoController c = new CarritoController(); 
         HttpSession session = request.getSession();
        

        String pstr = c.listarCarrito(session);
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
