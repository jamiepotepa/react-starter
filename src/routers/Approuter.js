import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Index from '../components/Index';

const AppRouter = (props) => {
   
    return (
        <Router basename=''>
            <Switch>
                <Route exact path="/" component={Index} />
            </Switch>
        </Router>
    );

};

export default AppRouter;