import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaCategorias = ({ 
  categorias, 
  abrirModalEdicion, 
  abrirModalEliminacion 
}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [categorias]);

  return (
    <>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria, index) => (
              <tr key={categoria.id || index}>
                <td>{index + 1}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <Button 
                    variant="warning" 
                    className="me-2"
                    onClick={() => abrirModalEdicion(categoria)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>

                  <Button 
                    variant="danger"
                    onClick={() => abrirModalEliminacion(categoria)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TablaCategorias;