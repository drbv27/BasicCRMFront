import React, { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  //state con los datos del formulario
  const [credenciales, guardarCredenciales] = useState({});

  //iniciar sesión en el servidor
  const iniciarSesion = async (e) => {
    e.preventDefault();

    //autenticar usuario
    try {
      const respuesta = await clienteAxios.post(
        "/iniciar-sesion",
        credenciales
      );
      //extraer el token y colocarlo en local storage
      const { token } = respuesta.data;
      localStorage.setItem("token", token);
      //alerta
      Swal.fire("Login Correcto", "Has iniciado sesión", "success");
      //redireccionar
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data.mensaje,
      });
    }
  };

  //almacenar lo que el usuarios escribe en el state
  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <div className="contenedor-formulario">
        <form onSubmit={iniciarSesion}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email para iniciar sesión"
              required
              onChange={leerDatos}
            />
          </div>
          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password para iniciar sesión"
              required
              onChange={leerDatos}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
