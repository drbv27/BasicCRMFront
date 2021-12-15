import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevoPedido() {
  //extraer ID del cliente
  const { id } = useParams();

  //state
  const [cliente, guardarCliente] = useState({});

  useEffect(() => {
    //obtener el cliente

    const consultarAPI = async () => {
      //consultar el cliente actual
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      guardarCliente(resultado.data);
    };
    //llamar la api
    consultarAPI();
  }, []);

  return (
    <>
      <div className="ficha-cliente">
        <h2>Nuevo Pedido</h2>
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Telefono: {cliente.telefono}</p>
      </div>

      <form>
        <legend>Busca un Producto y agrega una cantidad</legend>

        <div className="campo">
          <label>Productos:</label>
          <input type="text" placeholder="Nombre Productos" name="productos" />
        </div>

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
            readonly="readonly"
          />
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Pedido"
          />
        </div>
      </form>
    </>
  );
}

export default NuevoPedido;
