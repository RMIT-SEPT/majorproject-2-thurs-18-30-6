import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Availability extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }
    }

    render() {
        const user = JSON.parse(this.state.user);
        if(this.state.loggedInStatus){
            if(user['role'] === 'Worker'){
                return (
                    <div>
                        Select boxes of days of the week, submit to API.
                    </div>
                );
            }else{
                return <Redirect to={'/dashboard'} />
            }
        }else{
            return <Redirect to={'/login'} />
        }
    }
}

export default Availability;