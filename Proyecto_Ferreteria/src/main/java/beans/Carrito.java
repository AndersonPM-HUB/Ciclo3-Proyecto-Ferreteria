package beans;

import java.util.ArrayList;

public class Carrito {

    private int cantidad;
    private double total;
    private ArrayList<Producto> listaProductos;

    public Carrito(double total) {
        this.total = total;
        this.cantidad = listaProductos.size();
        this.listaProductos = new ArrayList<Producto>();
    }

    public Carrito() {
    }

    /**
     * @return the cantidad
     */
    public int getCantidad() {
        return cantidad;
    }

    /**
     * @param cantidad the cantidad to set
     */
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    /**
     * @return the total
     */
    public double getTotal() {
        return total;
    }

    /**
     * @param total the total to set
     */
    public void setTotal(double total) {
        this.total = total;
    }

    /**
     * @return the listaProductos
     */
    public ArrayList<Producto> getListaProductos() {
        return listaProductos;
    }

    public void agregarProducto(Producto p) {

        Producto producto;

        if (this.listaProductos == null) {
            this.listaProductos = new ArrayList<Producto>();
        }

        boolean encontrado = false;

        for (Producto listaProducto : listaProductos) {

            if (listaProducto.getId() == p.getId()) {
                listaProducto.setCantidad(listaProducto.getCantidad() + 1);
                encontrado = true;
            }

        }
        if (encontrado == false) {
            this.listaProductos.add(p);
        }

    }

    public Boolean eliminarProducto(int id) {

        boolean eliminado = false;
        for (Producto listaProducto : listaProductos) {

            if (listaProducto.getId() == id) {
                this.listaProductos.remove(listaProducto);
                eliminado = true;
                break;

            }

        }
        return eliminado;
    }

    public void setListaProductos(ArrayList<Producto> listaProductos) {
        this.listaProductos = listaProductos;
    }

    @Override
    public String toString() {
        return "Carrito{" + "cantidad=" + cantidad + ", total=" + total + ", listaProductos=" + listaProductos + '}';
    }

}
