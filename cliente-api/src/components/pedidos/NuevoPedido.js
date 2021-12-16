import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";

function NuevoPedido() {
  //extraer ID del cliente
  const { id } = useParams();

  //state
  const [cliente, guardarCliente] = useState({});

  const [busqueda, guardarBusqueda] = useState("");

  useEffect(() => {
    //obtener el cliente

    const consultarAPI = async () => {
      //consultar el cliente actual
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      guardarCliente(resultado.data);
    };
    //llamar la api
    consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buscarProducto = async (e) => {
    e.preventDefault();
    //Obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    //si no hay resultados una alerta,contrario...agregar al state
    if (resultadoBusqueda.data[0]) {
    } else {
      //no hay resultados
      Swal.fire({
        type: "error",
        title: "Sin resultados",
        text: "No hay resultados",
        icon: "error",
      });
    }

    console.log(resultadoBusqueda);
  };

  //almacenar una busqueda en el state
  const leerDatosBusqueda = (e) => {
    guardarBusqueda(e.target.value);
  };

  return (
    <>
      <h2>Nuevo Pedido</h2>
      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Telefono: {cliente.telefono}</p>
      </div>
      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />
      <ul className="resumen">
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
        <li>
          <div className="texto-producto">
            <p className="nombre">Macbook Pro</p>
            <p className="precio">$250</p>
          </div>
          <div className="acciones">
            <div className="contenedor-cantidad">
              <i className="fas fa-minus"></i>
              <input type="text" name="cantidad" />
              <i className="fas fa-plus"></i>
            </div>
            <button type="button" className="btn btn-rojo">
              <i className="fas fa-minus-circle"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
      </ul>
      <div className="campo">
        <label>Total:</label>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          readOnly="readonly"
        />
      </div>
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
      </div>
    </>
  );
}

export default NuevoPedido;
