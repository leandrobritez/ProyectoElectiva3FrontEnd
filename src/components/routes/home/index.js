import React, { Component } from "react";
import Sidebar from "../home/sidebar";
import Messages from "../home/messages";
import SockJsClient from 'react-stomp';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {URL_BACKEND} from "../../../core/opcionesApp";

class Home extends Component {

    static propTypes = {cookies: instanceOf(Cookies).isRequired};
    
    constructor(props, context){
        super(props);
        this.state={contactos: [], mensajesMostrar: [], contactoMostrar: undefined};
    }

    getContactos(){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URL_BACKEND + "/usuario/contactos", false);
        xhr.send(null);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        this.setState({contactos: response});
    }

    getMessages(contacto, usuarioId, contactoId){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", URL_BACKEND + "/mensaje?usuario_id=" + usuarioId + "&contacto_id=" + contactoId, false);
        xhr.send(null);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        this.setState({mensajesMostrar: response, contactoMostrar: contacto});
    }

    componentWillMount(){
        this.getContactos();
    }

    response(output){
        console.log(output);
        var statusCode = output.statusCodeValue;
        if (statusCode === 201) {
            this.getContactos();
        }
        else if(statusCode === 200){
            console.log(output);
            this.verifyUpdateMessage(output);            
        }
    }

    verifyUpdateMessage(mensaje){
        const { cookies } = this.props;
        var session = cookies.get("user_session");
        var contactoActual = this.state.contactoMostrar;
        console.log(mensaje.body, contactoActual, session);
        mensaje = mensaje.body;
        if(session === undefined){window.location.href = "login"}
        else{
            if(contactoActual !== undefined){
                if(contactoActual.usuario_id == mensaje.mensajeEmisor.usuario_id || contactoActual.usuario_id == mensaje.mensajeReceptor.usuario_id){
                    this.getMessages(contactoActual, session.usuario_id, contactoActual.usuario_id);
                }
            }
        }
    }

    showMessages(contacto){
        console.log(contacto);
        const { cookies } = this.props;
        var session = cookies.get("user_session");
        if(session === undefined){window.location.href = "login"}
        else{this.getMessages(contacto, session.usuario_id, contacto.usuario_id);}
    }

    sendMessage(mensaje){
        mensaje = JSON.stringify(mensaje);
        this.clientRef.sendMessage("/app/mensaje", mensaje);
    }

    logout(){
        const { cookies } = this.props;
        var session = cookies.get("user_session");
        if(session === undefined){window.location.href = "login"}
        else{cookies.remove("user_session"); window.location.href = "login"};
    }

    render() {
        const { cookies } = this.props;
        var session = cookies.get("user_session");
        if(session === undefined){
            window.location.href = "login";
            return (<section></section>);
        }        
        return (
            <section style={{height: "100%"}}>
                <section style={{display: "flex", height: "100%"}}>
                    <Sidebar
                        contactos={this.state.contactos}
                        getContactos={this.getContactos.bind(this)}
                        showMessages={this.showMessages.bind(this)}
                        logout={this.logout.bind(this)}
                    />
                    <Messages
                        mensajesMostrar={this.state.mensajesMostrar}
                        contactoMostrar={this.state.contactoMostrar}
                        sendMessage={this.sendMessage.bind(this)}
                        session={session}
                    />
                </section>
                <SockJsClient
                    url={URL_BACKEND + "/chat-electiva"}
                    topics={["/topic/register", "/topic/mensaje"]}
                    ref={(client) => { this.clientRef = client }}
                    onConnect={console.log("Connection established!")}
                    onDisconnect={console.log("Disconnected!")}
                    onMessage={this.response.bind(this)}
                    debug={true}
                />
            </section>
        );
    }
}

export default withCookies(Home);