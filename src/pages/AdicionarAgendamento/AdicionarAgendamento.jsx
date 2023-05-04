import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import ImgPETform from "../../assets/soul-pet-logo.svg";

export function AdicionarAgendamento() {
  //const
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  //function
  function onSubmit(data) {
    axios
      .post("http://localhost:3001/agendamentos", data)
      .then((response) => {
        toast.success("Agendado com sucesso!", {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/agendamentos");
      })
      .catch((error) => {
        toast.error("Não foi possivel agendar.", {
          position: "bottom-left",
          duration: 3000,
        });
        console.log(error);
      });
  }
  //return
  return (
    <div className="justify-content-between align-items-center m-4">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={5}>
          <img className="img-form ms-5" src={ImgPETform} alt="LOGO" />
        </Col>
        <Col className="justify-content-center ms-5">
          <h1>Novo Agendamento</h1>
          <Form className="w-75" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                className={errors.data && "is-invalid"}
                {...register("data", {
                  required: "data é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>PetId</Form.Label>
              <Form.Control
                type="number"
                className={errors.petId && "is-invalid"}
                {...register("petId", {
                  required: "petId é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ServiçoId</Form.Label>
              <Form.Control
                type="number"
                className={errors.servicoId && "is-invalid"}
                {...register("servicoId", {
                  required: "servicoId é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="number"
                className={errors.status && "is-invalid"}
                {...register("status", {
                  required: "status é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Agendar
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
