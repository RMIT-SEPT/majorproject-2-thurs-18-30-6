import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Addservicespages extends Component {
    constructor(){
        super()

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            adminId: "",
            service: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Addservicespages;