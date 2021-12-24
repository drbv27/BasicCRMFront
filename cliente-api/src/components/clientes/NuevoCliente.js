import React, { Fragment, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
//importar el context
import { CRMContext } from "../../context/CRMContext";

function NuevoCliente() {
  let navigate = useNavigate();
  //utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);
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

  //Añade en la REST API un cliente nuevo
  const agregarCliente = (e) => {
    e.preventDefault();

    //enviar peticion
    clienteAxios.post("/clientes", cliente).then((res) => {
      console.log(res);
      //validar si hay errores de mongodb
      if (res.data.code === 11000) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Ese correo ya esta registrado",
        });
        console.log("Error duplicado en Mongo");
      } else {
        console.log(res.data);
        Swal.fire("Se agregó el cliente", res.data.mensaje, "success");
      }

      //Redireccionar
      navigate("/", { replace: true });
    });
  };

  //verificar si el usuario está autenticado o no
  if (!auth.auth && localStorage.getItem("token") === "") {
    console.log("probando....");
    navigate("/iniciar-sesion");
  }

  return (
    <>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={agregarCliente}>
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
            type="tel"
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

//withRouter es un High Order Component(HOC) osea una funcion que toma un componente y retorna un nuevo componente
export default NuevoCliente;
