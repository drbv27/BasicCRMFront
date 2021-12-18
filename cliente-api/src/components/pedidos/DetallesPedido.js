import React from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function DetallesPedido({ pedido }) {
  const { cliente } = pedido;

  const eliminarPedido = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Luego no hay vuelta atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimínalo!",
    }).then((result) => {
      if (result.value) {
        // llamado a axios
        clienteAxios.delete(`/pedidos/${id}`).then((res) => {
          Swal.fire("Eliminado!", "El pedido se ha eliminado.", "success");
        });
      }
    });
  };

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">{pedido._id}</p>
        <p className="nombre">
          Cliente: {cliente.nombre} {cliente.apellido}
        </p>

        <div className="articulos-pedido">
          <p className="productos">Artículos Pedido: </p>

          <ul>
            {pedido.pedido.map((articulos) => (
              <li key={pedido._id + articulos.producto._id}>
                <p>Articulo: {articulos.producto.nombre}</p>
                <p>Precio:{articulos.producto.precio}</p>
                <p>Cantidad: {articulos.cantidad}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="total">Total: $ {pedido.total} </p>
      </div>
      <div className="acciones">
        <button
          onClick={() => eliminarPedido(pedido._id)}
          type="button"
          className="btn btn-rojo btn-eliminar"
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
}

export default DetallesPedido;
