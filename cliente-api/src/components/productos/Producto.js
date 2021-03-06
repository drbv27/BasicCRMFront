import React from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function Producto({ producto }) {
  //elimina un producto
  const eliminarProducto = (id) => {
    Swal.fire({
      title: "Esta seguro?",
      text: "Una vez eliminado no se podrá recuperar!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!!!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //eliminar en la rest api
        clienteAxios.delete(`/productos/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire("Eliminado!", res.data.mensaje, "success");
          }
        });
      }
    });
  };

  /* console.log(producto); */
  const { _id, nombre, precio, imagen } = producto;
  return (
    <>
      <li className="producto">
        <div className="info-producto">
          <p className="nombre">{nombre}</p>
          <p className="precio">$ {precio} </p>
          {imagen ? (
            <img src={`http://localhost:5000/${imagen}`} alt="camiseta" />
          ) : null}
        </div>
        <div className="acciones">
          <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Producto
          </Link>

          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => eliminarProducto(_id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
    </>
  );
}

export default Producto;
