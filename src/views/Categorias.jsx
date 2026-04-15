import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";



const Categorias = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h2>
            <i className="bi bi-bookmark-fill me-2"></i>
            Categorías
          </h2>
          <p>Aquí va la vista de gestión de categorías.</p>

          <Button variant="primary">
            Agregar categoría
          </Button>
        </Col>
      </Row>
    </Container>
  );
};


const [categorias, setCategorias] = useState([]);
const [cargando, setCargando] = useState(true);

// Modal eliminación
const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

// Modal edición
const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
const [categoriaEditar, setCategoriaEditar] = useState({
  id_categoria: "",
  nombre_categoria: "",
  descripcion_categoria: ""
});



export default Categorias;