import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import disponible from "../sidebar/disponible.svg";
import "./messages.css";

class Messages extends Component {

    constructor(props, context){
        super(props);
        this.state = {mensaje: ""};
    }

    componentDidUpdate(){
        var messageBlock = document.getElementById("message-block");
        messageBlock.scrollTop = messageBlock.scrollHeight - messageBlock.clientHeight;
        console.log(messageBlock);
    }

    render() {
        var mensajes = this.props.mensajesMostrar;
        var contacto = this.props.contactoMostrar;
        var contactoView = <Card.Header className="headerChat"><h1>Bienvenido al chat</h1></Card.Header>;
        var mensajesView = <section></section>        
        if(contacto !== undefined){
            contactoView = <Card.Header className="headerChat"><h1>{contacto.usuario}</h1><h4 style={{display: "flex"}}><img src={disponible}/>&nbsp;disponible&nbsp;|&nbsp;{contacto.usuario_nombre} {contacto.usuario_apellido}</h4></Card.Header>
        }
        if(mensajes.length > 0){
            mensajesView = mensajes.map((i, k)=>(
                <section>
                    <h4>
                        <strong>{i.mensajeEmisor.usuario_nombre + " " + i.mensajeEmisor.usuario_apellido}</strong>
                        &nbsp;<span>{i.mensajeFecha}</span>
                    </h4>
                    <h5>{i.mensaje}</h5>  
                </section>                    
            ));
        }
        return (
            <Card className="text-center" className="col-md-10" style={{ padding: "0" }}>
                {contactoView}
                <Card.Body className="message-block" id="message-block">
                    {mensajesView}
                </Card.Body>
                <Card.Footer className="footerIMessage text-muted">
                    <Form.Control
                        type="message"
                        placeholder="Escribe un mensaje"
                        value={this.state.mensaje}
                        onChange={this.onChangeMensaje.bind(this)}
                        onKeyPress={this.sendMessage.bind(this)}
                    />
                </Card.Footer>
            </Card>
        );
    }

    onChangeMensaje(e){e.preventDefault(); this.setState({mensaje: e.target.value})};

    sendMessage(event){
        if (event.which == 13 || event.keyCode == 13) {
            var contacto = this.props.contactoMostrar;
            var session = this.props.session;
            if(contacto == undefined || session == undefined){
                return;
            }
            var mensaje = {
                mensaje: this.state.mensaje,
                emisorId: session.usuario_id,
                receptorId: contacto.usuario_id,
                fecha: new Date()
            };
            console.log(mensaje);
            this.props.sendMessage(mensaje);
            this.setState({mensaje: ""});
        }
    }
}

export default Messages;