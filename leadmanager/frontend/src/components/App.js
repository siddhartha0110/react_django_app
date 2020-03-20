import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Register from './accounts/Register';
import Login from './accounts/Login';
import PrivateRoute from './common/privateRoute';
import { loadUser } from '../actions/auth';

import { Provider } from 'react-redux';
import store from '../store';

import { Provider as AlertProvider, transitions, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';

const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    transitions: transitions.SCALE
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path='/' component={Dashboard} />
                                    <Route exact path='/register' component={Register} />
                                    <Route exact path='/login' component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));