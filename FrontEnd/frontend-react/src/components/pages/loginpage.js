/*
    JS file for loginpage of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import '../../assets/loginpage.css'
import axios from "axios";

// components


class Loginpage extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="loginLog">
                <div className="formLog">
                    <a className="backLog" href={"/"}><i className="arrowLog leftLog"></i>back</a>
                    <h2 className="headLog">Welcome!</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input type={'email'} name={'email'} placeholder={'Email'} value={this.state.email}
                               onChange={this.handleChange} required/>
                        <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password}
                               onChange={this.handleChange} required/>

                        <button type={'submit'}> Login</button>
                    </form>
                    <h4 className="registerLog">Don't have an account? <a className="linkLog" href={"/register"}> Register</a></h4>
                </div>

            </div>
        );
    }
}

export default Loginpage;