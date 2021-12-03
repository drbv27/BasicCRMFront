import React, { Fragment } from "react";

/****Layout */
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

function App() {
  return (
    <>
      <Header />
      <div class="grid contenedor contenido-principal">
        <Navegacion />
        <main class="caja-contenido col-9">
          {/*TODO:Routing a los diferentes componentes */}
        </main>
      </div>
    </>
  );
}

export default App;
