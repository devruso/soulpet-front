import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Produtos() {
  const [produtos, setProdutos] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroNome, setFiltroNome] = useState("");

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="produtos container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Produtos</h1>
        <Button as={Link} to="/produtos/novo">
          <i className="bi bi-plus-lg me-2"></i> Adicionar novo produto
        </Button>
      </div>
      <div className="d-flex justify-content-center m-3 p-2">
        <div className="input-group mb-3 w-50 me-3">
          <input
            className="form-control"
            type="text"
            placeholder="Digite o nome "
            value={filtroNome}
            onChange={(event) => {
              setFiltroNome(event.target.value);
            }}
          />
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
          </div>
        </div>

        <div className="input-group mb-3 w-50">
          <input
            className="form-control"
            type="text"
            placeholder="Digite a categoria "
            value={filtroCategoria}
            onChange={(event) => {
              setFiltroCategoria(event.target.value);
            }}
          />
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>
      {produtos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Desconto</th>
              <th className="text-nowrap">Validade do Desconto</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos
              .filter((produto) =>
                produto.nome.toLowerCase().includes(filtroNome.toLowerCase())
              )
              .filter((produto) =>
                produto.categoria
                  .toLowerCase()
                  .includes(filtroCategoria.toLowerCase())
              )
              .map((produto) => {
                return (
                  <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.desconto}</td>
                    <td>{produto.dataDesconto}</td>
                    <td>{produto.categoria}</td>
                    <td className="d-flex gap-2">
                      <Button>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button>
                        <i className="bi bi-pencil-fill"></i>
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
