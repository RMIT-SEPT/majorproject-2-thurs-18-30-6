import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser/index";

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
            console.log('inside', response);
            const companyCount = response.data['length']
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = "<option> - </option>"
            for(let i = 0; i < companyCount; i++){
                let companyName = response.data[i]['company']
                htmlCode += "<option value='" + companyName + "'>" + companyName + "</option>"
            }
            this.setState({code: htmlCode})

        })

        //console.log('log', this.state.code);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        sessionStorage.setItem('company', this.state.company);
        //this.setState({redirect: '/register'});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        if(this.state.loggedInStatus) {
            return (
                <div className={'formRegType'}>
                    <h1>Select A Company:</h1>
                    <form onSubmit={this.handleSubmit}>
                        <select className={'dropdownRegCompany'} name={'company'} onChange={this.handleChange}>
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

