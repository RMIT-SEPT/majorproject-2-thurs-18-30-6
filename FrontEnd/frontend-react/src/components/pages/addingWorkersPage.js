import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import '../../assets/addingWorkersPage.css'

class AddingWorkersPage extends Component {
    constructor(){
        super()

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            address: "",
            phone: "",
            role: "Worker",
            adminId: null,
            errors: "",
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        const adminUser = JSON.parse(this.state.user)

        // post registration information to API
        axios.post("http://localhost:8080/register/worker", {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                address: this.state.address,
                phone: this.state.phone,
                role: this.state.role,
                adminId: adminUser['userId']

            },
            {
                withCredentials: true // lets browser store cookie for logged in purposes
            }).then(response => {
            console.log('adding worker response', response.data)

            // set code for response 200 here (show as good)
            sessionStorage.setItem('addedWorker', 'true')
            this.setState({redirect: '/registrationComplete'})

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
        if(this.state.loggedInStatus){
            const user = JSON.parse(this.state.user)
            if(user['role'] === 'Admin'){
                if (this.state.redirect){
                    return <Redirect to={this.state.redirect} />
                }
                return (
                    <div className={"formWorker"}>
                        <a className="backWorker" href={"/dashboard"}><i className="arrowWorker leftWorker"></i>back</a>
                        <h1 className={"headWorker"}> Add A Worker</h1>
                        <form onSubmit={this.handleSubmit}>

                            <input type={'text'} name={'firstName'} placeholder={'First Name'} value={this.state.firstName} onChange={this.handleChange} required/>
                            <input type={'text'} name={'lastName'} placeholder={'Last Name'} value={this.state.lastName} onChange={this.handleChange} required/>
                            <input type={'text'} name={'username'} placeholder={'Username'} value={this.state.username} onChange={this.handleChange} required/>
                            <input type={'password'} name={'password'} placeholder={'Password'} value={this.state.password} onChange={this.handleChange} required/>
                            <input type={'password'} name={'confirmPassword'} placeholder={'Confirm Password'} value={this.state.confirmPassword} onChange={this.handleChange} required/>
                            <input type={'text'} name={'address'} placeholder={'Address'} value={this.state.address} onChange={this.handleChange} required/>
                            <input type={'number'} name={'phone'} placeholder={'Phone Number'} value={this.state.phone} onChange={this.handleChange} required/>
                            <button type={'submit'}> Register </button>

                        </form>
                    </div>
                )
            }else{
                return <Redirect to={'/login'} />
            }
        }else {
            return <Redirect to={'/login'} />
        }
    }
}

export default AddingWorkersPage;