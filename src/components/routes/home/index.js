import React, { Component } from "react";
import Sidebar from "../home/sidebar";
import Messages from "../home/messages";

class Home extends Component {

    render() {
        return (
            <section style={{height: "100%"}}>
                <section style={{display: "flex", height: "100%"}}>
                    <Sidebar/>
                    <Messages/>
                </section>
            </section>
        );
    }
}

export default Home;