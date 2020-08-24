/*
    JS file for header of react website
    Started by: Winston . (S3777969)
    Worked on by: Rodrigo Miguel Rojas (s3784466)
*/
import React, {Component} from 'react';
import axios from 'axios';

class Registerpage extends Component {
    constructor(props){
        super(props);

        // The fields in the registration form (update when necessary)
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            errors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){

        // post registration information to API
        axios.post("enter registration api url here", {

        //    data structure in json format

        },
            {
                withCredentials: true // lets browser store cookie for logged in purposes
            }).then(response => {
                console.log('registration response', response)

                // set code for response 200 here (show as good)

        }).catch(error => {
            console.log('registration error', error)

            // set code for error response here (show as bad, display error messages)
        });

        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1> REGISTER: </h1> <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type={'email'} name={'email'} placeholder={'Email'} value={this.state.email} onChange={this.handleChange} required/>
                    <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                    <input type={'password'} name={'confirm_password'} placeholder={'Confirm Password'} value={this.state.confirm_password} onChange={this.handleChange} required/>

                    <button type={'submit'}> Register </button>
                </form>
            </div>
        );
    }
}

export default Registerpage;

