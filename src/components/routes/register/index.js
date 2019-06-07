import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";

class Register extends Component {

    render() {
        return (
            <Card style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
                <Card.Header style={{ background: "#343a40", color: "white" }}>Registrarse</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formGroupNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su nombre" />
                        </Form.Group>
                        <Form.Group controlId="formGroupApellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su apellido" />
                        </Form.Group>
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su nombre de usuario" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese su contraseña" />
                        </Form.Group>
                        <section style={{float: "right"}}>
                            <Button variant="secondary" onClick={(e)=>{window.location.href="login"}}>Volver</Button>&nbsp;
                            <Button variant="primary">Registrarse</Button>
                        </section>                            
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default Register;