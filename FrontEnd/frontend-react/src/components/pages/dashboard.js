import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import {Redirect} from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        if(this.state.loggedInStatus){
            //const user = JSON.parse(this.state.user);
            return (
                <div>
                    <Header/>
                    <Footer/>
                </div>
            );
        }
        else{
            return <Redirect to={'/'} />
        }

    }
}

export default Dashboard;
