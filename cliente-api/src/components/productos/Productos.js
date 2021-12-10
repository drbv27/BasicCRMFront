import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

//importar cliente axios
import clienteAxios from "../../config/axios";

import Producto from "./Producto";

import Spinner from "../layout/Spinner";

function Productos() {
  //productos=state,guardarproductos=funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  //useEffect para consultar la API cuando cargue
  useEffect(() => {
    //querie a la api
    const consultarAPI = async () => {
      const productosConsulta = await clienteAxios.get("/productos");
      guardarProductos(productosConsulta.data);
    };
    //llamar la api
    consultarAPI();
  }, [productos]);

  //Spinner de carga
  if (!productos.length) return <Spinner />;
  return (
    <>
      <>
        <h2>Productos</h2>
        <Link to="/productos/nuevo" className="btn btn-verde nvo-cliente">
          <i className="fas fa-plus-circle"></i>
          Nuevo Producto
        </Link>

        <ul className="listado-productos">
          {productos.map((producto) => (
            <Producto key={producto._id} producto={producto} />
          ))}
        </ul>
      </>
    </>
  );
}

export default Productos;
