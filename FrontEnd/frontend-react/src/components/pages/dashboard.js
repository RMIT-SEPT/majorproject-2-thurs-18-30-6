import React, {Component} from 'react';
// import Header from "../header_component/header";
// import Footer from "../footer_component/footer";
import {Redirect} from "react-router-dom";

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        const user = JSON.parse(this.state.user)
        if(this.state.loggedInStatus){
            if(user['role'] === 'Admin'){
                return (
                    <div>
                        <h1>Admin</h1>
                    </div>
                )
            }
            else if(user['role'] === 'User'){
                return (
                    <div>
                        <h1>User</h1>
                    </div>
                )
            }
        }
        else{
            return <Redirect to={'/'} />
        }

    }
}

export default Dashboard;
