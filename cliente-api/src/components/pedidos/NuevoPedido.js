import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import FormCantidadProducto from "./FormCantidadProducto";
import { useNavigate } from "react-router-dom";

function NuevoPedido() {
  let navigate = useNavigate();
  //extraer ID del cliente
  const { id } = useParams();

  //state
  const [cliente, guardarCliente] = useState({});

  const [busqueda, guardarBusqueda] = useState("");

  const [productos, guardarProductos] = useState([]);

  const [total, guardarTotal] = useState(0);

  useEffect(() => {
    //obtener el cliente

    const consultarAPI = async () => {
      //consultar el cliente actual
      const resultado = await clienteAxios.get(`/clientes/${id}`);
      guardarCliente(resultado.data);
    };
    //llamar la api
    consultarAPI();

    //actualizar el total a pagar
    actualizarTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productos]);

  const buscarProducto = async (e) => {
    e.preventDefault();
    //Obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(
      `/productos/busqueda/${busqueda}`
    );

    //si no hay resultados una alerta,contrario...agregar al state
    if (resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];
      //Agregar la llave "producto" (copia de id)
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      //ponerlo en el state
      guardarProductos([...productos, productoResultado]);

      /* console.log(productoResultado); */
    } else {
      //no hay resultados
      Swal.fire({
        type: "error",
        title: "Sin resultados",
        text: "No hay resultados",
        icon: "error",
      });
    }

    /* console.log(resultadoBusqueda); */
  };

  //almacenar una busqueda en el state
  const leerDatosBusqueda = (e) => {
    guardarBusqueda(e.target.value);
  };

  //actualizar la cantidad de productos
  const restarProductos = (i) => {
    //Copiar el arreglo original de productos
    const todosProductos = [...productos];
    //si está en cero, no puede ir mas allá
    if (todosProductos[i].cantidad === 0) return;
    //sino hacemos el decremento
    todosProductos[i].cantidad--;
    //almacenarlo en el state
    guardarProductos(todosProductos);
  };
  const aumentarProductos = (i) => {
    //copiar el arreglo para no mutra el original
    const todosProductos = [...productos];

    //incremento
    todosProductos[i].cantidad++;
    //colocarlo en el state
    guardarProductos(todosProductos);
  };

  //eliminar un producto del state
  const eliminarProductoPedido = (id) => {
    const todosProductos = productos.filter(
      (producto) => producto.producto !== id
    );

    guardarProductos(todosProductos);
  };

  //actualizar el total a pagar
  const actualizarTotal = () => {
    //sie le arreglo de productos es 0, el total es cero tmb
    if (productos.length === 0) {
      guardarTotal(0);
      return;
    }
    //calcular el nuevo total
    let nuevoTotal = 0;

    //recorrer todos los productos y sus cantidades y precios
    productos.map(
      (producto) => (nuevoTotal += producto.cantidad * producto.precio)
    );

    //almacenar el total ene le state
    guardarTotal(nuevoTotal);
  };

  //almacena el pedido en la BD
  const realizarPedido = (e) => {
    e.preventDefault();

    //contruir el objeto a enviar
    const pedido = {
      cliente: id,
      pedido: productos,
      total: total,
    };
    //almacenarlo en la BD
    const resultado = clienteAxios
      .post(`/pedidos/nuevo/${id}`, pedido)
      .then((res) => {
        console.log(res);
        //leer resultado
        if (res.status === 200) {
          //alerta de todo bien
          Swal.fire({
            type: "success",
            title: "Correcto",
            text: res.data.mensaje,
            icon: "success",
          });
        } else {
          //alerta de error
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: "Vuelva a intentarlo",
            icon: "error",
          });
        }
        //redireccionar
        navigate("/pedidos", { replace: true });
      });
  };

  return (
    <>
      <h2>Nuevo Pedido</h2>
      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>
          Nombre: {cliente.nombre} {cliente.apellido}
        </p>
        <p>Telefono: {cliente.telefono}</p>
      </div>
      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={leerDatosBusqueda}
      />
      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidadProducto
            key={producto.producto}
            producto={producto}
            restarProductos={restarProductos}
            aumentarProductos={aumentarProductos}
            eliminarProductoPedido={eliminarProductoPedido}
            index={index}
          />
        ))}
      </ul>
      <p className="total">
        Total a Pagar: <span> $ {total}</span>
      </p>
      {total > 0 ? (
        <form onSubmit={realizarPedido}>
          <input
            type="submit"
            value="Realizar Pedido"
            className="btn btn-verde btn-block"
          />
        </form>
      ) : null}
    </>
  );
}

export default NuevoPedido;
