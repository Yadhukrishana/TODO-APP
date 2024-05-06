import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './homePage/HomePage';
import ProjectView from './homePage/ProjectView';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/projects/:projectId" component={ProjectView} />
            </Switch>
        </Router>
    );
};

export default App;
