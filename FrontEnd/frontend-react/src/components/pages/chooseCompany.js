import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser/index";
import "../../assets/chooseCompany.css";

class ChooseCompany extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            company: "",
            code: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.post("http://localhost:8080/getAllCompanies").then(response => {

            const companyCount = response.data['length']
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = "<option> - </option>"
            for(let i = 0; i < companyCount; i++){
                let companyName = response.data[i]
                htmlCode += "<option value='" + companyName + "'>" + companyName + "</option>"
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


        axios.post("http://localhost:8080/getAdminId", {
            company: this.state.company
        }).then(response => {
            sessionStorage.setItem('adminId', response.data.toString());




        }).catch(error => {

        })

        const adminId = sessionStorage.getItem('adminId')

        if(adminId){
            this.setState({redirect: '/viewServices'});
        }

        event.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        if(this.state.loggedInStatus) {
            sessionStorage.removeItem('adminId')
            return (
                <div className={'formViewChooseCompany'}>
                    <h1>Select A Company:</h1>
                    <form onSubmit={this.handleSubmit}>
                        <select className={'dropdownChooseCompany'} name={'company'} onChange={this.handleChange}>
                            {parse(this.state.code)}
                        </select>
                        <button type={'submit'}> Next</button>
                    </form>
                </div>
            );
        } else {

            return <Redirect to={'/login'}/>
        }
    }
}

export default ChooseCompany;

