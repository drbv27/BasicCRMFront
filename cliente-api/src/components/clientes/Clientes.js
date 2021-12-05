import React, { useEffect, useState, Fragment } from "react";

//importar cliente axios
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

function Clientes() {
  //Trabajar con el state
  //clientes es igual al state, guardarClientes es igual ala funcionpara guardar el state

  const [clientes, guardarClientes] = useState([]);

  //qUERIE A LA api
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");
    //colocar el resultado en el state
    guardarClientes(clientesConsulta.data);
  };
  useEffect(() => {
    consultarAPI();
  }, []);
  return (
    <Fragment>
      <h2>Clientes</h2>
      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Clientes;
