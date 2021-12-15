import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

function EditarProductos() {
  let navigate = useNavigate();
  //obtener el id del producto
  const { id } = useParams();

  //producto = state y funcion para actualizar
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  //archivo = state, guaradarArchivo=setState
  const [archivo, guardarArchivo] = useState("");

  //useEffect cuando el componente carga
  useEffect(() => {
    //consultar la api para traer el producto a editar
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      /* console.log(productoConsulta); */
      guardarProducto(productoConsulta.data);
    };
    consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Edita un producto en la base de datos
  const editarProducto = async (e) => {
    e.preventDefault();

    //crear un formdata
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);

    //almacenarlo en la db
    try {
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //Lanzar una alerta
      if (res.status === 200) {
        Swal.fire("Cambios Guardados!", res.data.mensaje, "success");
      }
      //redireccionar
      navigate("/productos", { replace: true });
    } catch (error) {
      console.log(error);
      //lanzar alerta
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo",
      });
    }
  };

  //leer los datos del formulario
  const leerInformacionProducto = (e) => {
    guardarProducto({
      //obtener una copia del statey agregar lo nuevo
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  //coloca la imagen en el state
  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  //Extraer los valores del state
  const { nombre, precio, imagen } = producto;

  if (!nombre) return <Spinner />;

  return (
    <>
      <h2>Editar Producto</h2>

      <form onSubmit={editarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={nombre}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={leerInformacionProducto}
            defaultValue={precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`http://localhost:5000/${imagen}`}
              alt="camiseta"
              width="300"
            />
          ) : null}
          <input type="file" name="imagen" onChange={leerArchivo} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
          />
        </div>
      </form>
    </>
  );
}

export default EditarProductos;
