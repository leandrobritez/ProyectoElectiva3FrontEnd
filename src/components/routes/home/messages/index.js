import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import disponible from "../sidebar/disponible.svg";
import "./messages.css";

class Messages extends Component {

    render() {
        return (
            <Card className="text-center" className="col-md-10" style={{ padding: "0" }}>
                <Card.Header className="headerChat">
                    <h1>jparedes</h1>
                    <h4 style={{display: "flex"}}><img src={disponible}/>&nbsp;disponible&nbsp;|&nbsp;José Paredes</h4>
                </Card.Header>
                <Card.Body>
                </Card.Body>
                <Card.Footer className="footerIMessage text-muted">
                    <Form.Control type="message" placeholder="Escribe un mensaje" />
                </Card.Footer>
            </Card>
        );
    }
}

export default Messages;