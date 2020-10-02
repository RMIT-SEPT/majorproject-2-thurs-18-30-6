import React, {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import '../../assets/viewWorkers.css';


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
            console.log('log:', response.data)
            //htmlCode is the string that is parsed later on to HTML
            let htmlCode = ""
            for(let i = 0; i < userCount; i++){
                let workerDetails = "ID: " + response.data[i]['firstName'] + ", " + response.data[i]['lastName']
                htmlCode += "<li>" + workerDetails + "</li>"
            }

            this.setState({code: htmlCode})

        })
    }


    render() {
        return (
            <div>
                <Header/>

                <a className="backViewWorker " href={"/dashboard"}><i className="arrowViewWorker leftViewWorker"></i>back</a>

                <h3 className={"headWorker"}>Your Workers:</h3> <br/>
                <ul className={"ulWorker"}>
                    {parse(this.state.code)}
                </ul>

                <Footer/>
            </div>
        );
    }
}

export default ViewWorkers;