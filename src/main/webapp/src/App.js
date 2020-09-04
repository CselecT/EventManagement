import React, {useEffect, useState} from 'react';
import PaginationTable from "./components/table/PaginationTable";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./components/Home";
import User from "./components/User";
import Admin from "./components/Admin";


function App() {

    return(
    <Router>
        <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/user" exact={true} component={User}/>
            <Route path="/admin" exact={true} component={Admin}/>
        </Switch>
    </Router>)
}

export default App;
