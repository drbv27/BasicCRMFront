import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

function EditarProductos() {
  //obtener el id del producto
  const { id } = useParams();

  //producto = state y funcion para actualizar
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  //useEffect cuando el componente carga
  useEffect(() => {
    //consultar la api para traer el producto a editar
    const consultarAPI = async () => {
      const productoConsulta = await clienteAxios.get(`/productos/${id}`);
      console.log(productoConsulta);
      guardarProducto(productoConsulta.data);
    };
    consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Editar Productos</h2>
    </>
  );
}

export default EditarProductos;
