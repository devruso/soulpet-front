import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Pets() {
  const [pets, setPets] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/pets")
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Pets</h1>
        <Button as={Link} to="/pets/novo">
          <i className="bi bi-plus-lg me-2"></i> Pet
        </Button>
      </div>
      {pets === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td className="d-flex gap-2">
                    <Button>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button as={Link} to={`/pets/adicionar/${pet.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button as={Link} to={`/pets/detalhe/${pet.id}`}>
                    <i class="bi bi-info-square"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
