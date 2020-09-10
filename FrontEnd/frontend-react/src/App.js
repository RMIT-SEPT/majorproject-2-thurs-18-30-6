import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

// pages
import Mainpage from './components/pages/mainpage';
import PageNotFound from './components/pages/pageNotFound';
import Loginpage from './components/pages/loginpage';
import Registerpage from './components/pages/registerpage';
import Dashboard from './components/pages/dashboard';
import RegistrationComplete from "./components/pages/registrationComplete";


class App extends Component {

    render() {
        return (

            <Router>
                <Switch>
                    <Route exact path={'/'} component={Mainpage}/>
                    <Route exact path={'/login'} component={Loginpage}/>
                    <Route exact path={'/register'} component={Registerpage}/>
                    <Route exact path={'/dashboard'} component={Dashboard}/>
                    <Route exact path={'/registrationComplete'} component={RegistrationComplete}/>

                    {/*KEEP AT THE END*/}
                    <Route path={'/404'} component={PageNotFound}/>
                    <Redirect to={'/404'}/>
                </Switch>
            </Router>

        );
    }
}

export default App;
