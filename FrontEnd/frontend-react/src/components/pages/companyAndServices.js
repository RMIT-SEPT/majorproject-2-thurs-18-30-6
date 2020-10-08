import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser/index";
import "../../assets/companyAndServices.css";

class CompanyAndServices extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            company: "",
            service: "",
            adminId: null,
            companyCode: "",
            serviceCode: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.post("http://localhost:8080/getAllCompanies").then(response => {

            const companyCount = response.data['length']
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = "<option> - </option>"
            for(let i = 0; i < companyCount; i++){
                let companyName = response.data[i]
                htmlCode += "<option value='" + companyName + "'>" + companyName + "</option>"
            }
            this.setState({companyCode: htmlCode})

        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCompanyChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })

        axios.post("http://localhost:8080/getAdminId", {
            company: event.target.value
        }).then(response => {

            this.setState({adminId: response.data}, function() {

                axios.post("http://localhost:8080/getServices", {
                    adminId: this.state.adminId
                }).then(response => {

                    const count = response.data['length'];
                    let htmlCode = "<option> - </option>";

                    for(let i = 0; i < count; i++){
                        htmlCode += "<option value='" + response.data[i] + "'>" + response.data[i] + "</option>"
                    }

                    this.setState({serviceCode: htmlCode})

                })

            })

        }).catch(error => {

            console.log('company name error', error.data);

        })


    }

    handleSubmit(event){

        sessionStorage.setItem('adminId', this.state.adminId);
        sessionStorage.setItem('company', this.state.company);
        sessionStorage.setItem('service', this.state.service);

        this.setState({redirect: "/serviceDetails"})


        event.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        if(this.state.loggedInStatus) {
            sessionStorage.removeItem('adminId');
            sessionStorage.removeItem('company');
            sessionStorage.removeItem('service');
            return (
                <div className={'formCAS'}>

                    <form onSubmit={this.handleSubmit}>
                        <h3>Select a Company:</h3>
                        <select className={'dropdownChooseCompany'} name={'company'} onChange={this.handleCompanyChange} required>
                            {parse(this.state.companyCode)}
                        </select>
                        <br/>
                        <h3>Select a Service:</h3>
                        <select className={'dropdownChooseCompany'} name={'service'} onChange={this.handleChange} required>
                            {parse(this.state.serviceCode)}
                        </select>
                        <br/>
                        <button type={'submit'}> Next</button>
                    </form>
                </div>
            );
        } else {

            return <Redirect to={'/login'}/>
        }
    }
}

export default CompanyAndServices;

