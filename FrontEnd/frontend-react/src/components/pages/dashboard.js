import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import {Redirect} from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state ={

        }
    }

    render() {
        if(this.props.loggedInStatus){
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
