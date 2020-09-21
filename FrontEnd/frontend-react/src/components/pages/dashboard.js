import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
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
        const user = JSON.parse(this.state.user);
        if(this.state.loggedInStatus){
            if(user['role'] === 'Admin'){
                return (
                    <div>
                        <Header/>
                        <h1>Admin Dashboard</h1>
                        <h3>Worker Options:</h3>
                        <form action={'/shiftAllocation'}>
                            <button type={'submit'}>Allocate Shifts</button>
                        </form>
                        <Footer/>
                    </div>
                );
            }else if(user['role'] === 'Worker'){
                return(
                    <div>
                        <Header/>
                        <h1>Worker Dashboard</h1>
                        <h3>Worker Options:</h3>
                        <form action={'/availability'}>
                            <button type={'submit'}>Set Availability</button>
                        </form>
                        <Footer/>
                    </div>
                );
            }

        }
        else{
            return <Redirect to={'/'} />
        }

    }
}

export default Dashboard;
