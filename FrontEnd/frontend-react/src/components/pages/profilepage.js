import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Profilepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        const user = JSON.parse(this.state.user)
        if(this.state.loggedInStatus) {
            return (
                <div>

                    <h1>Profile Page:</h1>
                    <h4>Role: {user['role']}</h4>
                    <h4>Username: {user['username']}</h4>
                    <h4>Name: {user['firstName']} {user['lastName']}</h4>
                    <h4>Address: {user['address']}</h4>
                    <h4>Phone: {user['phone']}</h4>

                    <form action={'/dashboard'}>
                        <button type={'submit'}>Back to dashboard</button>
                    </form>

                </div>
            );
        }else{
            return <Redirect to={'/login'}/>
        }


    }
}

export default Profilepage;