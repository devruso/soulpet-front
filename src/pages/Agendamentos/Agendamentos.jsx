import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";


export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);
    
    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="agendamentos container">
            <div className="d-flex justify-content-between align-items-center m-4">
                <h1>Agendamentos</h1>
                <Button variant="light" as={Link} to="/agendamentos/novo" className="m-2">
                        <i className="bi bi-plus-lg me-1"></i> Agendamento
                    </Button>
            </div>
                    {
                        agendamentos === null ?
                        <Loader /> 
                        :
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Data</th>
                                <th>cratedAt</th>
                                <th>petId</th>
                                <th>ServiçoId</th>
                                <th className="d-flex justify-content-center align-items-center">Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                           {agendamentos.map(agendamentos => {
                            return (
                                <tr key={agendamentos.id}>
                                    <td className="align-middle text-wrap">{agendamentos.id}</td>
                                    <td className="align-middle text-wrap">{new Date(agendamentos.data).toLocaleDateString('pt-BR')}</td>
                                    <td className="align-middle text-wrap">{agendamentos.createdAt}</td>
                                    <td className="align-middle text-wrap">{agendamentos.petId}</td>
                                    <td className="align-middle text-wrap">{agendamentos.servicoId}</td>
                                    <td className="d-flex justify-content-center align-items-center gap-2 align-middle text-wrap">
                                        <Button>
                                        <i className="bi bi-trash-fill"></i>
                                        </Button>
                                        <Button>
                                        <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                           })}   
                        </tbody>
                    </Table>
                    }
        </div>
    );
}