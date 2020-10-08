import React, {Component} from 'react';
import axios from "axios";
// import parse from "html-react-parser/index";
import "../../assets/serviceDetails.css";
import {Redirect} from "react-router-dom";

class ServiceDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            service: sessionStorage.getItem('service'),
            adminId: sessionStorage.getItem('adminId'),
            company: sessionStorage.getItem('company'),
            description: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        axios.post("http://localhost:8080/getDescription", {

            adminId: parseInt(this.state.adminId),
            service: this.state.service

        }).then(response => {
            this.setState({description: response.data});

        }).catch(error =>{

        })

    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){

        if(event.target.value === "Yes"){
            this.setState({redirect: "/bookingPage"})
        }
        else{
            this.setState({redirect: "/dashboard"})
        }

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
                    <form className={'textViewServ'} onSubmit={this.handleSubmit}>
                        <h2>You have chosen:</h2>
                        <h4>Company Name: <br/>{this.state.company}</h4>
                        <h4>Service Name: <br/>{this.state.service}</h4>
                        <h4>Service Description: <br/>{this.state.description}</h4>

                        <br/>
                        <h4 className={'booking'}>Do you want to create a booking?</h4>
                        <button type={'submit'} onClick={this.handleSubmit} value={'Yes'}>Yes</button>
                        <button type={'submit'} onClick={this.handleSubmit} value={'No'}>No</button>
                    </form>

                </div>
            );
        }
    }
}

export default ServiceDetails;