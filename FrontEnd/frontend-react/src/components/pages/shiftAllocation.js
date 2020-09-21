import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class ShiftAllocation extends Component {
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
            if(user['role'] === 'Admin'){
                return (
                    <div>
                        Choose worker, set hours, submit to api.
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

export default ShiftAllocation;