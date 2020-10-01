import React, {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";


class ViewWorkers extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            code: ""
        }

        const adminUser = JSON.parse(this.state.user)
        const adminId = adminUser['userId']

        axios.post("http://localhost:8080/getworker/" + adminId).then(response => {
            const userCount = response.data['length']
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = ""
            for(let i = 0; i < userCount; i++){
                let workerDetails = "ID: " + response.data[i]['userId'] + ", " + response.data[i]['username']
                htmlCode += "<li>" + workerDetails + "</li>"
            }

            this.setState({code: htmlCode})

        })
    }


    render() {
        return (
            <div>
                <Header/>

                <a href={"/dashboard"}>back</a>
                <h3>Your Workers:</h3> <br/>
                <ul>
                    {parse(this.state.code)}
                </ul>

                <Footer/>
            </div>
        );
    }
}

export default ViewWorkers;