import React from "react";

import { Link } from "react-router-dom";

const Navegacion = () => {
  return (
    <aside class="sidebar col-3">
      <h2>Administración</h2>

      <nav class="navegacion">
        <Link to={"/"} class="clientes">
          Clientes
        </Link>
        <Link to={"/productos"} class="productos">
          Productos
        </Link>
        <Link to={"/pedidos"} class="pedidos">
          Pedidos
        </Link>
      </nav>
    </aside>
  );
};

export default Navegacion;
