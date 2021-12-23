import React, { useEffect, useState, useContext, Fragment } from "react";

//importar cliente axios
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
//importar el context
import { CRMContext } from "../../context/CRMContext";

function Clientes() {
  //Trabajar con el state
  //clientes es igual al state, guardarClientes es igual ala funcionpara guardar el state

  const [clientes, guardarClientes] = useState([]);

  //utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);
  console.log(auth);

  useEffect(() => {
    //qUERIE A LA api
    const consultarAPI = async () => {
      const clientesConsulta = await clienteAxios.get("/clientes");
      //colocar el resultado en el state
      guardarClientes(clientesConsulta.data);
    };
    consultarAPI();
  }, [clientes]);

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
