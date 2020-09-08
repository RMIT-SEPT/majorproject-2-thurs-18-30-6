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


class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: false,
            user: {}
        }
    }

    changeStatus(status){
        this.setState({loggedInStatus: status})
    }
    render() {
        return (

            <Router>
                <Switch>
                    <Route exact path={'/'} render={ props => (< Mainpage {...props} loggedInStatus ={this.state.loggedInStatus}/> )}/>
                    <Route exact path={'/login'} component={Loginpage}/>
                    <Route exact path={'/register'} render={ props => (< Registerpage {...props} loggedInStatus ={this.state.loggedInStatus} changeStatus = {this.changeStatus.bind(this)}/> )}/>
                    <Route exact path={'/dashboard'} render={ props => (< Dashboard {...props} loggedInStatus ={this.state.loggedInStatus} changeStatus = {this.changeStatus.bind(this)}/> )}/>

                    {/*KEEP AT THE END*/}
                    <Route path={'/404'} component={PageNotFound}/>
                    <Redirect to={'/404'}/>
                </Switch>
            </Router>

        );
    }
}

export default App;
