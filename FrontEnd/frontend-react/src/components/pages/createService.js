import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import parse from "html-react-parser";

class CreateService extends Component {
    constructor(props){
        super(props);


        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            service: "",
            availability: "",
            redirect: null,
            errors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event){

        const user = JSON.parse(this.state.user)
        const username = user['username']

        axios.post("http://localhost:8080/setService", {

            username: username,
            service: this.state.service,
            availability: "True"

        }).then(response => {
            console.log('service response', response.data)

            alert("Successfully created service '" + this.state.service + "'!")

            this.setState({redirect: "/dashboard"})
        }).catch(errors => {
            const htmlCode = "<p style='text-align: center; color: red; font-weight: bold'>Error</p>"
            this.setState({errors: htmlCode})
            alert("error")
        })

        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }else{

            if(this.state.loggedInStatus){
                const user = JSON.parse(this.state.user);

                if(user['role'] === 'Admin'){
                    return (
                        <div>

                            <div className="formServices">
                                <a className="backServices" href={"/dashboard"}><i className="arrowServices leftServices"></i>back</a>
                                <h2 className="headServices">Create a service:</h2>

                                {parse(this.state.errors)}
                                <form onSubmit={this.handleSubmit}>
                                    <input type={'text'} name={'service'} placeholder={'Service'} value={this.state.service}
                                           onChange={this.handleChange} required/>

                                    <button type={'submit'}> Create Service </button>
                                </form>
                            </div>

                        </div>
                    )
                }else{
                    return <Redirect to={"/dashboard"}/>
                }
            }else{
                return <Redirect to={"/login"}/>
            }
        }
    }
}

export default CreateService;