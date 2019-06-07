import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import disponible from "./disponible.svg";
import noDisponible from "./noDisponible.svg";
import "./sidebar.css";

class Sidebar extends Component {
    render() {
        return (
            <ListGroup className="col-md-2" style={{paddingRight: "0"}}>
                <ListGroup.Item> 
                    <span style={{display: "flex"}}><img src={disponible} />&nbsp;&nbsp;jparedes</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{display: "flex"}}><img src={disponible} />&nbsp;&nbsp;mcorrea</span>                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{display: "flex"}}><img src={disponible} />&nbsp;&nbsp;estefi</span>                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{display: "flex"}}><img src={disponible} />&nbsp;&nbsp;estela</span>                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <span style={{display: "flex"}}><img src={noDisponible} />&nbsp;&nbsp;rosam</span>                    
                </ListGroup.Item>                                
                <ListGroup.Item>
                    <span style={{display: "flex"}}><img src={noDisponible} />&nbsp;&nbsp;benitoc</span>                    
                </ListGroup.Item>                
            </ListGroup>
        );
    }
}

export default Sidebar;