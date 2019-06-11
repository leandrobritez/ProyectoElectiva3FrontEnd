import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import disponible from "./disponible.svg";
import noDisponible from "./noDisponible.svg";
import "./sidebar.css";

class Sidebar extends Component {

    logout(){

    }
    
    render() {
        var contactos = this.props.contactos;
        var listContact = <section></section>;
        if(contactos.length > 0){
            listContact = contactos.map((i, k)=>(
                <ListGroup.Item key={k} onClick={(e)=>{this.props.showMessages(i)}}>
                    <span style={{display: "flex"}}><img src={disponible} />&nbsp;&nbsp;{i.usuario}</span>
                </ListGroup.Item>                
            ));
        }
        return (
            <ListGroup className="col-md-2" style={{paddingRight: "0"}}>
                <ListGroup.Item>
                    <Button className="col-md-12" variant="outline-danger" onClick={this.props.logout.bind(this)}>Cerrar sesión</Button>
                </ListGroup.Item>
                {listContact}
            </ListGroup>
        );
    }
}

export default Sidebar;