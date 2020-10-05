import React, {Component} from 'react';
import axios from "axios";
import parse from "html-react-parser/index";

class ViewServices extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            adminId: sessionStorage.getItem('adminId'),
            code: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        if(this.state.adminId == null){
            window.location.reload(false)
        }else{
            console.log("ID", this.state.adminId);
            axios.post("http://localhost:8080/getServices", {
                adminId: parseInt(this.state.adminId)
            }).then(response => {
                console.log('hello', response.data);

                const count = response.data['length'];
                let htmlCode = "";

                for(let i = 0; i < count; i++){
                    htmlCode += "<li>" + response.data[i] + "</li>"
                }

                this.setState({code: htmlCode})

            })
        }


    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){

    }

    render() {
        return (
            <div>
                <a href={'/dashboard'}>back</a>
                <h1>SERVICES:</h1>
                <ul>
                    {parse(this.state.code)}
                </ul>
            </div>
        );
    }
}

export default ViewServices;