import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";

class Login extends Component {

    render() {
        return (
            <Card style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
                <Card.Header style={{ background: "#343a40", color: "white" }}>Iniciar sesión</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese su nombre de usuario" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese su contraseña" />
                        </Form.Group>
                        <Button variant="primary" className="col-md-12" style={{ marginBottom: "5px" }} onClick={(e)=>{window.location.href="home"}}>Acceder</Button>
                        <Button variant="secondary" className="col-md-12" onClick={(e)=>{window.location.href="register"}}>Registrarse</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default Login;