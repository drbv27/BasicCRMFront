import React, { Fragment, useState } from "react";

function NuevoCliente() {
  //cliente=state, guardarCliente= funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  //leer los datos del formulario
  const actualizarState = (e) => {
    //almacenar lo que el usuario escribe en el state
    guardarCliente({
      //obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
    console.log(cliente);
  };

  //Validar el formulario
  const validarCliente = () => {
    //Destructuring al state
    const { nombre, apellido, empresa, email, telefono } = cliente;

    //revisar que las propiedades del state tengan contenido
    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;

    //return true o false
    return valido;
  };

  return (
    <>
      <h2>Nuevo Cliente</h2>
      <form>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="email"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
}

export default NuevoCliente;
