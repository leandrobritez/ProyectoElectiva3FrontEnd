import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Notifications, {notify} from 'react-notify-toast';

class Login extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};

    constructor(props, context) {
        super(props);
        this.state = { username: "", password: "" };
    }

    makeLogin(e) {
        e.preventDefault();
        var credenciales = { username: this.state.username, password: this.state.password };
        const { cookies } = this.props; const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://backendchat.herokuapp.com/usuario/login", false);
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = xhr.responseText;
                cookies.set("user_session", JSON.parse(response), { path: "/", maxAge: 600 });
                window.location.href = "home";
            }
            else{
                var error = JSON.parse(xhr.responseText);
                notify.show(error.message, "error");
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(credenciales));
    }

    render() {
        const { cookies } = this.props;
        var session = cookies.get("user_session");
        if(session !== undefined){
            window.location.href = "home";
            return (<section></section>);
        }
        return (
            <section>
                <Notifications/>
                <Card style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
                    <Card.Header style={{ background: "#343a40", color: "white" }}>Iniciar sesión</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese su nombre de usuario" value={this.state.username} onChange={this.onChangeUsername.bind(this)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su contraseña" value={this.state.password} onChange={this.onChangePassword.bind(this)} />
                            </Form.Group>
                            <Button variant="primary" className="col-md-12" style={{ marginBottom: "5px" }} onClick={(e) => { window.location.href = "home" }} onClick={this.makeLogin.bind(this)}>Acceder</Button>
                            <Button variant="secondary" className="col-md-12" onClick={(e) => { window.location.href = "register" }}>Registrarse</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </section>
        );
    }
    onChangeUsername(e) { e.preventDefault(); this.setState({ username: e.target.value }); }
    onChangePassword(e) { e.preventDefault(); this.setState({ password: e.target.value }); }
}

export default withCookies(Login);