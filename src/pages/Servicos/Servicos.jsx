import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Table, Button} from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
export function Servicos(){

    const [servicos, setServicos] = useState(null);
    const [show, setShow] = useState(false);
    const [idServico, setIdServico] = useState(null);

    useEffect(() =>{
        initializeTable();
    },[])

    const handleClose = () => {
        setIdServico(null);
        setShow(false);
      };
      const handleShow = (id) => {
        setIdServico(id);
        setShow(true);
      };

    function initializeTable(){
        axios.get("http://localhost:3001/servicos")
        .then((res)=>{
            setServicos(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return (
    <div className="container ">
        <h1>Serviços</h1>
        {servicos === null ? (<Loader/>) :
        (
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {servicos.map((servico) =>{
            return (
                <tr key={servico.id} >
                    <td>{servico.nome}</td>
                    <td>{servico.preco}</td>
                    <td className="d-flex gap-2 m-t-auto">
                      <Button onClick={() => handleShow(servico.id)} data-toggle="tooltip" title="Deletar serviço">
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button as={Link} to={`/servicos/editar/${servico.id}`} data-toggle="tooltip" title="Atualizar serviço">
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </td>
                </tr>
            )
        })}
      </tbody>
        </Table>)}
    </div>
)
}