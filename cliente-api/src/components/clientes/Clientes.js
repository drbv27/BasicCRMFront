import React, { useEffect, useState, useContext, Fragment } from "react";

//importar cliente axios
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
//importar el context
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";

function Clientes() {
  let navigate = useNavigate();
  //Trabajar con el state
  //clientes es igual al state, guardarClientes es igual ala funcionpara guardar el state

  const [clientes, guardarClientes] = useState([]);

  //utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);
  /*  console.log(auth); */

  useEffect(() => {
    if (auth.token !== "") {
      //qUERIE A LA api
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          //COLOCAR EL RESULTADO EN EL STATE
          guardarClientes(clientesConsulta.data);
        } catch (error) {
          //Error con autorizacion
          if (error.response.status === 500) {
            //Redireccionar
            navigate("/iniciar-sesion", { replace: true });
          }
        }
      };
      consultarAPI();
    } else {
      //Redireccionar
      navigate("/iniciar-sesion", { replace: true });
    }
  }, [clientes]);

  //si el state esta como false
  if (!auth.auth) {
    navigate("/iniciar-sesion", { replace: true });
  }

  if (!clientes.length) return <Spinner />;
  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Clientes;
