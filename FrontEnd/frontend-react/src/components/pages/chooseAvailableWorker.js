import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import parse from 'html-react-parser';

class ChooseAvailableWorker extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            chosenWorker: "",
            userId: "",
            username: "",
            redirect: null,
            allUsers: "Your workers: ",
            code: ""
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const adminUser = JSON.parse(this.state.user)
        const adminId = adminUser['userId']

        axios.post("http://localhost:8080/getworker/" + adminId).then(response => {
            const userCount = response.data['length']

            let htmlCode = "<option> - </option>"
            for(let i = 0; i < userCount; i++){
                let usernameAndId = response.data[i]['username'] + "," + response.data[i]['userId']
                htmlCode += "<option value='" + usernameAndId + "'>" + usernameAndId + "</option>"
            }
            this.setState({code: htmlCode})

        })

    }

    handleChange(event){
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log('user', this.state.chosenWorker)
    }
    handleSubmit(event) {

        console.log('hi', this.state.chosenWorker)
        const workerArray = this.state.chosenWorker.split(",")
        const workerUsername = workerArray[0]
        const workerId = workerArray[1]

        if (workerId) {
            sessionStorage.setItem('workerUserId', workerId)
            sessionStorage.setItem('workerUserName', workerUsername)
            this.setState({redirect: '/shiftAllocation'})
        }

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        } else {
            if(this.state.loggedInStatus){
                const user = JSON.parse(this.state.user)
                if(user['role'] === 'Admin'){
                    return (

                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <h1>Select a Worker:</h1>
                                <select name={'chosenWorker'} onChange={this.handleChange}>
                                    {parse(this.state.code)}
                                </select>
                                <br/>
                                <button type='submit'>Next</button>
                            </form>
                        </div>

                    );
                }else{
                    return <Redirect to={'/dashboard'}/>
                }
            }else{
                return <Redirect to={'/login'}/>
            }
        }
    }
}

export default ChooseAvailableWorker;