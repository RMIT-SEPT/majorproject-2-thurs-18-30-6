import React, {Component} from 'react';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";
import {Redirect} from "react-router-dom";
import '../../assets/dashboard.css'

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
                        <div className={'bodyDash'}>
                            <h1>Admin Dashboard</h1>

                            <h3>Profile:</h3>
                            <form className={'formDash'} action={'/profile'}>
                                <button className={'buttonDash'} type={'submit'}>View Profile Page</button>
                            </form>

                            <h3>Worker Options:</h3>
                            <form className={'formDash'} action={'/workerRegistration'}>
                                <button className={'buttonDash'}  type={'submit'}>Add a Worker</button>
                            </form>
                            <form className={'formDash'} action={'/chooseAvailableWorker'}>
                                <button className={'buttonDash'} type={'submit'}>Allocate Worker Shifts</button>
                            </form>

                        </div>
                        <Footer/>
                    </div>
                )
            }
            else if(user['role'] === 'Customer'){
                return (
                    <div>
                        <Header/>
                        <div className={'bodyDash'}>
                            <h1>User Dashboard</h1>
                            <h3>Profile:</h3>
                            <form className={'formDash'} action={'/profile'}>
                                <button className={'buttonDash'} type={'submit'}>View Profile Page</button>
                            </form>
                        </div>
                        <Footer/>
                    </div>
                )
            }
            else if(user['role'] === 'Worker'){
                return (
                    <div>
                        <Header/>
                        <div className={'bodyDash'}>
                            <h1>Worker Dashboard</h1>

                            <h3>Profile:</h3>
                            <form className={'formDash'} action={'/profile'}>
                                <button className={'buttonDash'}  type={'submit'}>View Profile Page</button>
                            </form>

                            <h3>Availability:</h3>
                            <form className={'formDash'} action={'/availability'}>
                                <button className={'buttonDash'}  type={'submit'}>Set Availability</button>
                            </form>
                            <form className={'formDash'} action={'/viewShifts'}>
                                <button className={'buttonDash'}  type={'submit'}>View Assigned Shifts</button>
                            </form>

                        </div>
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
