import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import '../../assets/shiftAllocation.css';


class ShiftAllocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            username: sessionStorage.getItem('workerUserName'),
            userId: sessionStorage.getItem('workerUserId'),
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
            mondayAssigned: "Unassigned",
            tuesdayAssigned: "Unassigned",
            wednesdayAssigned: "Unassigned",
            thursdayAssigned: "Unassigned",
            fridayAssigned: "Unassigned",
            redirect: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Monday'
        }).then(result => {
            this.setState({monday: result.data.toString()})
        })
        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Tuesday'
        }).then(result => {
            this.setState({tuesday: result.data.toString()})
        })
        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Wednesday'
        }).then(result => {
            this.setState({wednesday: result.data.toString()})
        })
        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Thursday'
        }).then(result => {
            this.setState({thursday: result.data.toString()})
        })
        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Friday'
        }).then(result => {
            this.setState({friday: result.data.toString()})
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        let assigned = false;

        if(this.state.mondayAssigned === 'Assigned'){
            assigned = true
        }else{
            assigned = false
        }
        axios.post("http://localhost:8080/setShift", {
            userId: parseInt(this.state.userId),
            timeslot: "Monday",
            assigned: assigned
        })

        if(this.state.tuesdayAssigned === 'Assigned'){
            assigned = true
        }else{
            assigned = false
        }
        axios.post("http://localhost:8080/setShift", {
            userId: parseInt(this.state.userId),
            timeslot: "Tuesday",
            assigned: assigned
        })

        if(this.state.wednesdayAssigned === 'Assigned'){
            assigned = true
        }else{
            assigned = false
        }
        axios.post("http://localhost:8080/setShift", {
            userId: parseInt(this.state.userId),
            timeslot: "Wednesday",
            assigned: assigned
        })

        if(this.state.thursdayAssigned === 'Assigned'){
            assigned = true
        }else{
            assigned = false
        }
        axios.post("http://localhost:8080/setShift", {
            userId: parseInt(this.state.userId),
            timeslot: "Thursday",
            assigned: assigned
        })

        if(this.state.fridayAssigned === 'Assigned'){
            assigned = true
        }else{
            assigned = false
        }
        axios.post("http://localhost:8080/setShift", {
            userId: parseInt(this.state.userId),
            timeslot: "Friday",
            assigned: assigned
        })

        this.setState({redirect: "/dashboard"})

        event.preventDefault()
    }




    render() {

        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }else{
            const user = JSON.parse(this.state.user);
            if(this.state.loggedInStatus){
                if(user['role'] === 'Admin'){
                    return (
                        <div>
                            <h3>Availabilities for {this.state.username}:</h3>
                            <h4>Monday - {this.state.monday}</h4>
                            <h4>Tuesday - {this.state.tuesday}</h4>
                            <h4>Wednesday - {this.state.wednesday}</h4>
                            <h4>Thursday - {this.state.thursday}</h4>
                            <h4>Friday - {this.state.friday}</h4>

                            <form className={'formShift'} onSubmit={this.handleSubmit}>
                                <h1>Set Worker's Shifts This Week</h1>

                                <h4 className={'days'}>Monday:</h4>
                                <select className={"dropdownShift"} name={'mondayAssigned'} onChange={this.handleChange}>

                                    <option value={'Unassigned'}>Unassigned</option>
                                    <option value={'Assigned'}>Assigned</option>

                                </select>

                                <h4 className={'days'}>Tuesday:</h4>
                                <select className={"dropdownShift"} name={'tuesdayAssigned'} onChange={this.handleChange}>

                                    <option value={'Unassigned'}>Unassigned</option>
                                    <option value={'Assigned'}>Assigned</option>

                                </select>

                                <h4 className={'days'}>Wednesday:</h4>
                                <select className={"dropdownShift"} name={'wednesdayAssigned'} onChange={this.handleChange}>

                                    <option value={'Unassigned'}>Unassigned</option>
                                    <option value={'Assigned'}>Assigned</option>

                                </select>

                                <h4 className={'days'}>Thursday:</h4>
                                <select className={"dropdownShift"} name={'thursdayAssigned'} onChange={this.handleChange}>

                                    <option value={'Unassigned'}>Unassigned</option>
                                    <option value={'Assigned'}>Assigned</option>

                                </select>

                                <h4 className={'days'}>Friday:</h4>
                                <select className={"dropdownShift"} name={'fridayAssigned'} onChange={this.handleChange}>

                                    <option value={'Unassigned'}>Unassigned</option>
                                    <option value={'Assigned'}>Assigned</option>

                                </select>
                                <br/>
                                <button className ={'submitShift'} type={'submit'}> Submit </button>
                            </form>

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
}

export default ShiftAllocation;