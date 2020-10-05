import React, {Component} from 'react';
import axios from "axios";

class ViewServices extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            company: sessionStorage.getItem('company'),
            code: "",
            adminId: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.post("http://localhost:8080/getAdminId").then(response => {

        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ViewServices;