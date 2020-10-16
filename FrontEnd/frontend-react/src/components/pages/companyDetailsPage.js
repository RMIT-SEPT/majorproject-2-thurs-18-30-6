import React, {Component} from 'react';
import axios from "axios";
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import "../../assets/companyDetailsPage.css"

class CompanyDetailsPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            redirect: null,
            companyId: sessionStorage.getItem('companyId'),
            companyName: sessionStorage.getItem('companyName'),
            companyPhone: "",
            companyDetail: "",
            companyEmail: ""
        }

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        const token = sessionStorage.getItem('token')
        const proper = token.substr(1, token.length - 2)

        axios.post("http://localhost:8080/getContactInfo",{
            userId: parseInt(this.state.companyId)
        },{
            headers: {
                'Authorization': `Bearer ${proper}`
            }
        }).then(response =>{
            console.log(response.data)
            this.setState({companyDetail: response.data['detail']})
            this.setState({companyPhone: response.data['phone']})
            this.setState({companyEmail: response.data['email']})
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <a className="backContact" href={"/dashboard"}><i className="arrowContact leftContact"></i>back</a>
                <br/>
                <div className={'text'}>
                    <h1>Contact Us:</h1>
                    <h4>Company Number: {this.state.companyPhone}</h4>
                    <h4>Company Email: {this.state.companyEmail}</h4>
                    <h4>Company Detail: {this.state.companyDetail}</h4>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default CompanyDetailsPage;