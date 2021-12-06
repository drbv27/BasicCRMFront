import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function EditarCliente() {
  let navigate = useNavigate();
  //Obtener el id
  const { id } = useParams();
  /* console.log(id); */
  //cliente=state, guardarCliente= funcion para guardar el state
  const [cliente, datosCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  //query a la API

  const consultarAPI = async () => {
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
    //colocar en el state los datos del cliente
    datosCliente(clienteConsulta.data);
    /* console.log(clienteConsulta.data); */
  };

  //useEffect, cuando el componente carga
  useEffect(() => {
    consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //leer los datos del formulario
  const actualizarState = (e) => {
    //almacenar lo que el usuario escribe en el state
    datosCliente({
      //obtener una copia del state actual
      ...cliente,
      [e.target.name]: e.target.value,
    });
    /* console.log(cliente); */
  };

  //Envia una peticion por axios para actualizar el cliente
  const actualizarCliente = (e) => {
    e.preventDefault();

    //enviar peticion por axios
    clienteAxios.put(`/clientes/${cliente._id}`, cliente).then((res) => {
      /* console.log(res); */
      //validar si hay errores de mongodb
      if (res.data.code === 11000) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Ese correo ya esta registrado",
        });
        console.log("Error duplicado en Mongo");
      } else {
        /* console.log(res.data); */
        Swal.fire("Correcto", "Se actualizo correctamente", "success");
      }
      //redireccion
      navigate("/", { replace: true });
    });
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
      <h2>Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
}

//withRouter es un High Order Component(HOC) osea una funcion que toma un componente y retorna un nuevo componente
export default EditarCliente;
