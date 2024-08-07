import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImgPETform from "../../assets/soul-pet-logo.svg";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export function NovoCliente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Ganchos para puxar informações do IBGE
  const [ufs, setUfs] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [selecionarEstado, setSelecionarEstado] = useState([]);

  // ESTADOS-UF
  useEffect(() => {
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`)
      .then((response) => {
        setUfs(response.data);
      });
  }, []);

  // CIDADES
  useEffect(() => {
    if (selecionarEstado === "0") {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selecionarEstado}/municipios`
      )
      .then((response) => {
        setCidades(response.data);
      });
  }, [selecionarEstado]);

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/clientes", data)
      .then((response) => {
        toast.success("Cliente adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/clientes");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <div className="justify-content-between align-items-center m-4">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={5}>
          <img className="img-form ms-5" src={ImgPETform} alt="LOGO" />
        </Col>
        <Col className="justify-content-center ms-5">
          <h1>Novo Cliente</h1>
          <Form className="w-75" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                className={errors.nome && "is-invalid"}
                {...register("nome", {
                  required: "O nome é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
              {errors.nome && (
                <Form.Text className="invalid-feedback">
                  {errors.nome.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                className={errors.email && "is-invalid"}
                {...register("email", {
                  required: "O e-mail é obrigatório.",
                  maxLength: {
                    value: 255,
                    message: "Limite de 255 caracteres.",
                  },
                })}
              />
              {errors.email && (
                <Form.Text className="invalid-feedback">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                className={errors.telefone && "is-invalid"}
                {...register("telefone", {
                  required: "O telefone é obrigatório.",
                  maxLength: {
                    value: 255,
                    message: "Limite de 255 caracteres.",
                  },
                })}
              />
              {errors.telefone && (
                <Form.Text className="invalid-feedback">
                  {errors.telefone.message}
                </Form.Text>
              )}
            </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Estado</Form.Label>
                  <Form.Select id="uf" className={errors.endereco?.uf && "is-invalid"}{...register("endereco.uf", {required: "É obrigatório selecionar um estado"})} onChange={(event) => setSelecionarEstado(event.target.value)}>
                    <option value="">Selecione um Estado</option>
                    {ufs.map((uf)=>(
                        <option key={uf.sigla} value={uf.sigla}>
                            {uf.nome}
                        </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cidade</Form.Label>
                  <Form.Select id="cidade" className={errors.endereco?.cidade && "is-invalid"}{...register("endereco.cidade", {required: "É obrigatório selecionar uma cidade"})}>
                    <option value="">Selecione uma Cidade</option>
                    {cidades.map((cidade)=>(
                        <option key={cidade.id} value={cidade.nome}>
                            {cidade.nome}
                        </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
              <Form.Label>Cep</Form.Label>
              <Form.Control
                type="text"
                className={errors.endereco?.cep && "is-invalid"}
                {...register("endereco.cep", {
                  required: "A rua é obrigatória.",
                  maxLength: {
                    value: 255,
                    message: "Limite de 255 caracteres.",
                  },
                })}
              />
              {errors.endereco?.cep && (
                <Form.Text className="invalid-feedback">
                  {errors.endereco?.cep.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                className={errors.endereco?.rua && "is-invalid"}
                {...register("endereco.rua", {
                  required: "A rua é obrigatória.",
                  maxLength: {
                    value: 255,
                    message: "Limite de 255 caracteres.",
                  },
                })}
              />
              {errors.endereco?.rua && (
                <Form.Text className="invalid-feedback">
                  {errors.endereco?.rua.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numero</Form.Label>
              <Form.Control
                type="text"
                className={errors.endereco?.numero && "is-invalid"}
                {...register("endereco.numero", {
                  required: "O número é obrigatório.",
                  maxLength: {
                    value: 255,
                    message: "Limite de 255 caracteres.",
                  },
                })}
              />
              {errors.endereco?.numero && (
                <Form.Text className="invalid-feedback">
                  {errors.endereco?.numero.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="dark" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
