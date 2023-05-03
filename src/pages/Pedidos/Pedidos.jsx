import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table} from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";
import { Form } from 'react-bootstrap';
import ImgPETform from "../../assets/soul-pet-logo.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const baseUrl = "http://localhost:3001";


export function Pedidos() {
  
  const [pedidos, setPedidos] = useState([]);
  const [show, setShow] = useState(false);
  const [idPedido, setIdPedido] = useState(null);
  const [clienteFiltro, setClienteFiltro] = useState("");
  const [produtoFiltro, setProdutoFiltro] = useState("");
  const [clienteNome, setClienteNome] = useState({});
  const [produtoNome, setProdutoNome] = useState({});

 const handleClose = () => {
    setIdPedido(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdPedido(id);
    setShow(true);
  };

  const onDelete = () => {
    axios
      .delete(`${baseUrl}/pedido/${idPedido}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        setPedidos(pedidos.filter((pedido) => pedido.id !== idPedido));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  };
    

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios.get(`${baseUrl}/pedidos`)
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

    const filtrarPedidos = (pedido) => {
    const cliente = clienteNome[pedido.clienteId]
      ? clienteNome[pedido.clienteId].toLowerCase()
      : "";
    const produto = produtoNome[pedido.produtoId]
      ? produtoNome[pedido.produtoId].toLowerCase()
      : "";
    return (
      cliente.includes(clienteFiltro.toLowerCase()) &&
      produto.includes(produtoFiltro.toLowerCase())
    );
  };

  const handleDeletarPedido = (id) => {
    const novosPedidos = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(novosPedidos);
  };

  useEffect(() => {
    if (
      pedidos &&
      Object.keys(clienteNome).length !== pedidos.length &&
      Object.keys(produtoNome).length !== pedidos.length
    ) {
      const promises = [];
      pedidos.forEach((pedido) => {
        const nomeCliente = axios
          .get(`${baseUrl}/clientes/${pedido.clienteId}`)
          .then((response) => {
            const cliente = response.data;
            setClienteNome((nomeAnteriorCliente) => {
              return {
                ...nomeAnteriorCliente,
                [pedido.clienteId]: cliente.nome,
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
        const nomeProduto = axios
          .get(`${baseUrl}/produtos/${pedido.produtoId}`)
          .then((response) => {
            const produto = response.data;
            setProdutoNome((nomeAnteriorProduto) => {
              return {
                ...nomeAnteriorProduto,
                [pedido.produtoId]: produto.nome,
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
        promises.push(nomeCliente);
        promises.push(nomeProduto);
      });
      Promise.all(promises).then(() => {
        console.log(
          "Clientes e Produtos carregados com sucesso."
        );
      });
    }
  }, [pedidos, clienteNome, produtoNome]);

  return (
    <div className="pedidos container">
       <Row>
        <Col>
          <img src={ImgPETform} alt="soul-pet-logo" />
        </Col>
        <Col>
      <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-4">Pedidos</h1>
        <Button as={Link} to="/pedidos/novo">
          <i className="bi bi-plus-lg me-2"></i> Novo Pedido
        </Button>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Filtrar por Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do cliente:"
            value={clienteFiltro}
            onChange={(event) => setClienteFiltro(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Filtrar por Produto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do produto:"
            value={produtoFiltro}
            onChange={(event) => setProdutoFiltro(event.target.value)}
          />
        </Form.Group>
        <Button
          variant="secondary"
          onClick={() => {
            setClienteFiltro("");
            setProdutoFiltro("");
          }}
        >
          Reset filtros
        </Button>
      </Form>
      <hr />
      {pedidos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Cliente</th>
              <th>Produto</th>
             
            </tr>
          </thead>
          <tbody>
            {pedidos.filter(filtrarPedidos).map((pedido) => {
              return (
                <tr key={pedido.id}>
                  <td>{pedido.quantidade}</td>
                  <td>{clienteNome[pedido.clienteId]}</td>
                  <td>{produtoNome[pedido.produtoId]}</td>
                  <td className="d-flex gap-2">
                    <Button
                      variant="danger"
                      onClick={() => handleDeletarPedido(pedido.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>

                    <Button
                      variant="primary"
                      as={Link}
                      to={`/pedidos/editar/${pedido.id}`}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>

                    <Button
                      variant="info"
                      as={Link}
                      to={`/pedidos/detalhes/${pedido.id}`}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </Button>

                    <Button
                      className="m-2"
                      onClick={() => handleShow(pedido.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirmar exclusão do pedido?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

       </Col>
            </Row>
    </div>
  );
}