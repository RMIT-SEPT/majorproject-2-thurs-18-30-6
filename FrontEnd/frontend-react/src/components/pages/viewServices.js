import React, {Component} from 'react';
import axios from "axios";
import parse from "html-react-parser/index";
import "../../assets/viewServices.css";
import {Redirect} from "react-router-dom";

class ViewServices extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            service: "",
            adminId: sessionStorage.getItem('adminId'),
            code: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log("ID", this.state.adminId);
        axios.post("http://localhost:8080/getServices", {
            adminId: parseInt(this.state.adminId)
        }).then(response => {
            console.log('hello', response.data);

            const count = response.data['length'];
            let htmlCode = "<option> - </option>";

            for(let i = 0; i < count; i++){
                htmlCode += "<option value='" + response.data[i] + "'>" + response.data[i] + "</option>"
            }

            this.setState({code: htmlCode})

        })


    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){

        event.preventDefault();
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }else if(this.state.adminId == null){
            return <Redirect to={"/dashboard"}/>
        }

        if(this.state.loggedInStatus){
            return (
                <div className={'formViewServ'}>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Select A Service:</h1>
                        <select className={'dropdownViewServ'}name={'service'} onChange={this.handleChange}>
                            {parse(this.state.code)}
                        </select>
                        <button type={'submit'}> Next</button>
                    </form>
                </div>
            );
        }
    }
}

export default ViewServices;