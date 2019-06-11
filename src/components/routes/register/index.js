import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import SockJsClient from 'react-stomp';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Notifications, {notify} from 'react-notify-toast';
import {URL_BACKEND} from "../../../core/opcionesApp";

class Register extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};    

    constructor(props, context){
        super(props);
        this.state = {
            nombre: "", apellido: "", username: "", password: ""            
        }
    }

    makeRegister(e){
        e.preventDefault();
        var userRequest = {
            usuario: this.state.username,
            usuario_nombre: this.state.nombre,
            usuario_apellido: this.state.apellido,
            usuario_contrasea: this.state.password
        };
        userRequest = JSON.stringify(userRequest);
        this.clientRef.sendMessage("/app/register", userRequest);
    }

    response(output){
        console.log(output);
        var statusCode = output.statusCodeValue;
        if (statusCode === 201) {
            window.location.href = "login";
        }
        else{
            console.log(output);
            notify.show("Error", "error");
        }
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
                    <Card.Header style={{ background: "#343a40", color: "white" }}>Registrarse</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su nombre" value={this.state.nombre} onChange={this.onChangeNombre.bind(this)}/>
                            </Form.Group>
                            <Form.Group controlId="formGroupApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su apellido" value={this.state.apellido} onChange={this.onChangeApellido.bind(this)}/>
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su nombre de usuario" value={this.state.usuario} onChange={this.onChangeUsername.bind(this)}/>
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su contraseña" value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
                            </Form.Group>
                            <section style={{float: "right"}}>
                                <Button variant="secondary" onClick={(e)=>{window.location.href="login"}}>Volver</Button>&nbsp;
                                <Button variant="primary" onClick={this.makeRegister.bind(this)}>Registrarse</Button>
                            </section>                            
                        </Form>
                    </Card.Body>
                </Card>
                <SockJsClient
                    url={URL_BACKEND + "/chat-electiva"}
                    topics={['/topic/register']}
                    ref={(client) => { this.clientRef = client }}
                    onConnect={console.log("Connection established!")}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={this.response.bind(this)}
                    debug={true}
                />
            </section>                            
        );
    }
    onChangeNombre(e){e.preventDefault(); this.setState({nombre: e.target.value});}
    onChangeApellido(e){e.preventDefault(); this.setState({apellido: e.target.value});}    
    onChangeUsername(e){e.preventDefault(); this.setState({username: e.target.value});}
    onChangePassword(e){e.preventDefault(); this.setState({password: e.target.value});}    
}

export default withCookies(Register);