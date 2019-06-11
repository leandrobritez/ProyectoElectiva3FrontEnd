import React, { Component } from 'react';
import Login from "../components/routes/login";
import Home from "../components/routes/home";
import Register from "../components/routes/register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

class App extends Component {

  constructor(props, context) {
    super(props);
  }

  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </CookiesProvider>        
    );
  }

}

export default App;
