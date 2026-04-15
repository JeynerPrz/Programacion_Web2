import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { supabase } from "../database/supabaseconfig";

const Categorias = () => {

  // Estados
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [toast, setToast] = useState({
    mostrar: false,
    mensaje: "",
    tipo: ""
  });

  // Modal eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  // Modal edición / agregar
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [categoriaEditar, setCategoriaEditar] = useState({
    id_categoria: "",
    nombre_categoria: "",
    descripcion_categoria: ""
  });

  // 🔥 CARGAR CATEGORÍAS
  const cargarCategorias = async () => {
    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) {
        console.error("Error al cargar categorías:", error.message);

        setToast({
          mostrar: true,
          mensaje: "Error al cargar categorías.",
          tipo: "error",
        });

        return;
      }

      setCategorias(data || []);

    } catch (err) {
      console.error("Excepción al cargar categorías:", err.message);

      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar categorías.",
        tipo: "error",
      });

    } finally {
      setCargando(false);
    }
  };

  // 🔥 useEffect (LO QUE TE PIDIÓ EL PROFE)
  useEffect(() => {
    cargarCategorias();
  }, []);

  // 🔥 AGREGAR CATEGORÍA
  const agregarCategoria = async () => {
    try {
      const { error } = await supabase
        .from("categorias")
        .insert([
          {
            nombre_categoria: categoriaEditar.nombre_categoria,
            descripcion_categoria: categoriaEditar.descripcion_categoria
          }
        ]);

      if (error) {
        console.error("Error al agregar:", error.message);
        return;
      }

      await cargarCategorias(); // 🔥 recargar datos

      // Limpiar formulario
      setCategoriaEditar({
        id_categoria: "",
        nombre_categoria: "",
        descripcion_categoria: ""
      });

      setMostrarModalEdicion(false);

    } catch (err) {
      console.error("Error inesperado:", err.message);
    }
  };

  // Funciones modales
  const abrirModalEdicion = (categoria) => {
    setCategoriaEditar({
      id_categoria: categoria.id_categoria,
      nombre_categoria: categoria.nombre_categoria,
      descripcion_categoria: categoria.descripcion_categoria,
    });
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminacion(true);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col className="d-flex justify-content-between align-items-center">
          <h2>
            <i className="bi bi-bookmark-fill me-2"></i>
            Categorías
          </h2>

          <Button 
            variant="primary"
            onClick={() => setMostrarModalEdicion(true)}
          >
            <i className="bi bi-plus-lg me-1"></i>
            Agregar categoría
          </Button>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          {cargando ? (
            <p>Cargando categorías...</p>
          ) : (
            <ul>
              {categorias.map((cat) => (
                <li key={cat.id_categoria}>
                  {cat.nombre_categoria} - {cat.descripcion_categoria}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Categorias;