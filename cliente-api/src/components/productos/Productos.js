import React, { useEffect, useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";

//importar cliente axios
import clienteAxios from "../../config/axios";

import Producto from "./Producto";

import Spinner from "../layout/Spinner";
//importar el context
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";

function Productos() {
  let navigate = useNavigate();
  //productos=state,guardarproductos=funcion para guardar el state
  const [productos, guardarProductos] = useState([]);

  //utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  //useEffect para consultar la API cuando cargue
  useEffect(() => {
    if (auth.token !== "") {
      //querie a la api
      const consultarAPI = async () => {
        try {
          const productosConsulta = await clienteAxios.get("/productos", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          guardarProductos(productosConsulta.data);
        } catch (error) {
          //Error con autorizacion
          if (error.response.status === 500) {
            //Redireccionar
            navigate("/iniciar-sesion", { replace: true });
          }
        }
      };
      //llamar la api
      consultarAPI();
    } else {
      navigate("/iniciar-sesion", { replace: true });
    }
  }, [productos]);

  //si el state esta como false
  if (!auth.auth) {
    navigate("/iniciar-sesion", { replace: true });
  }

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
