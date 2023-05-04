import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";


export function AdicionarAgendamento() {
    //const
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        <div className="container">
            <h1>Novo Agendamento</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="date" className={errors.data && "is-invalid"} {...register("data", { required: "data é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."}})}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>PetId</Form.Label>
                    <Form.Control type="number" className={errors.petId && "is-invalid"} {...register("petId", { required: "petId é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."}})}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ServiçoId</Form.Label>
                    <Form.Control type="number" className={errors.servicoId && "is-invalid"} {...register("servicoId", { required: "servicoId é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."}})}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="number" className={errors.status && "is-invalid"} {...register("status", { required: "status é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."}})}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Agendar
                </Button>
            </Form>

        </div>
    );
}