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
        const user = JSON.parse(this.state.user)
        if(this.state.loggedInStatus){
            if(user['role'] === 'Admin'){
                return (
                    <div>
                        <Header/>
                        <h1>Admin Dashboard</h1>
                        <h3>Worker Options:</h3>
                        <form action={'/workerRegistration'}>
                            <button type={'submit'}>Add a Worker</button>
                        </form>
                        <form action={'/chooseAvailableWorker'}>
                            <button type={'submit'}>Allocate Worker Shifts</button>
                        </form>
                        <h3>Profile:</h3>
                        <form action={'/profile'}>
                            <button type={'submit'}>View Profile Page</button>
                        </form>
                        <Footer/>
                    </div>
                )
            }
            else if(user['role'] === 'Customer'){
                return (
                    <div>
                        <Header/>
                        <h1>User Dashboard</h1>
                        <h3>Profile:</h3>
                        <form action={'/profile'}>
                            <button type={'submit'}>View Profile Page</button>
                        </form>
                        <Footer/>
                    </div>
                )
            }
            else if(user['role'] === 'Worker'){
                return (
                    <div>
                        <Header/>
                        <h1>Worker Dashboard</h1>
                        <h3>Availability:</h3>
                        <form action={'/availability'}>
                            <button type={'submit'}>Set Availability</button>
                        </form>
                        <form action={'/viewShifts'}>
                            <button type={'submit'}>View Assigned Shifts</button>
                        </form>
                        <h3>Profile:</h3>
                        <form action={'/profile'}>
                            <button type={'submit'}>View Profile Page</button>
                        </form>
                        <Footer/>
                    </div>
                )
            }
            else{
                return <Redirect to={'/login'} />
            }
        }
        else{
            return <Redirect to={'/login'} />
        }

    }
}

export default Dashboard;
