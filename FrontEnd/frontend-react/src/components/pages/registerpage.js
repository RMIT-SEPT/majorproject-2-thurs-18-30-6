/*
    JS file for header of react website
    Started by: Winston . (S3777969)
    Worked on by: Rodrigo Miguel Rojas (s3784466)
*/
import React, {Component} from 'react';
import axios from 'axios';
import '../../assets/registerpage.css'


class Registerpage extends Component {
    constructor(props){
        super(props);

        // The fields in the registration form (update when necessary)
        this.state = {
            name: "",
            email: "",
            username: "",
            phone_number: "",
            address: "",
            password: "",
            confirm_password: "",
            errors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){

        // post registration information to API
        axios.post("http://localhost:8080/api/user/register", {

            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            phone_number: this.state.phone_number,
            address: this.state.address,
            password: this.state.password,
            confirm_password: this.state.confirm_password

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
            <div className={"formReg"}>
                <a className="backReg" href={"/"}><i className="arrowReg leftReg"></i>back</a>
                <h1 className={"headReg"}> REGISTER </h1>
                <form onSubmit={this.handleSubmit}>
                    <input type={'text'} name={'name'} placeholder={'Name'} value={this.state.name} onChange={this.handleChange} required/>
                    <input type={'email'} name={'email'} placeholder={'Email'} value={this.state.email} onChange={this.handleChange} required/>
                    <input type={'text'} name={'username'} placeholder={'Username'} value={this.state.username} onChange={this.handleChange} required/>
                    <input type={'number'} name={'phone_number'} placeholder={'Phone Number'} value={this.state.phone_number} onChange={this.handleChange} required/>
                    <input type={'text'} name={'address'} placeholder={'Address'} value={this.state.address} onChange={this.handleChange} required/>
                    <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                    <input type={'password'} name={'confirm_password'} placeholder={'Confirm Password'} value={this.state.confirm_password} onChange={this.handleChange} required/>

                    <button type={'submit'}> Register </button>

                </form>
                <h4 className={"loginReg"}>Don't have an account? <a className="linkReg" href={"/login"}> Login</a></h4>
            </div>
        );
    }
}

export default Registerpage;

