import React, { Fragment } from "react";

//Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/****Layout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

/**Componentes */
import Clientes from "./components/clientes/Clientes";
import Pedidos from "./components/pedidos/Pedidos";
import Productos from "./components/productos/Productos";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div class="grid contenedor contenido-principal">
          <Navegacion />
          <main class="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes />} />

              <Route path="/productos" element={<Productos />} />

              <Route path="/pedidos" element={<Pedidos />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
