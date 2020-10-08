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
            saturday: null,
            sunday: null,

            date: null,
            dateAssigned: "Unassigned",

            mondayAssigned: "Unassigned",
            tuesdayAssigned: "Unassigned",
            wednesdayAssigned: "Unassigned",
            thursdayAssigned: "Unassigned",
            fridayAssigned: "Unassigned",
            saturdayAssigned: "Unassigned",
            sundayAssigned: "Unassigned",
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
        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Saturday'
        }).then(result => {
            this.setState({saturday: result.data.toString()})
        })
        axios.post("http://localhost:8080/getAvailability", {
            username: this.state.username,
            timeslot: 'Sunday'
        }).then(result => {
            this.setState({sunday: result.data.toString()})
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    //updating back end on days where the workers are given shifts
    handleSubmit(event){

        const d = new Date();
        const currDate = d.getDate();
        const currMonth = d.getMonth() + 1;
        const currYear = d.getFullYear();
        const chosen = this.state.date.split("-");
        const chosenYear = parseInt(chosen[0]);
        const chosenMonth = parseInt(chosen[1]);
        const chosenDate = parseInt(chosen[2]);

        const chosenFull = new Date(chosenYear, chosenMonth, chosenDate)

        const send = chosenFull.getFullYear() + "-" + chosenFull.getMonth() + "-" + chosenFull.getDate();

        alert(send)

        // BUNCH OF IF STATEMENTS, IF FALSE SEND ERROR MESSAGE TO USER, IF TRUE POST IT

        if(chosenYear >= currYear && chosenMonth >= currMonth && chosenDate >= currDate){
            console.log( 'bla',this.state.date)
            axios.post("http://localhost:8080/setShift", {
                userId: parseInt(this.state.userId),
                date: send
            })
            alert('Shift submitted successfully!')
            event.preventDefault();
        }else{
            alert('Date entered is invalid, please select a valid date')
        }

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
                        //admin can view worker's availability based on worker chosen in choose available worker page
                        <div>
                            <div className={'divShift'}>
                                <h3>Availabilities for {this.state.username}:</h3>
                                <h4>Monday - {this.state.monday}</h4>
                                <h4>Tuesday - {this.state.tuesday}</h4>
                                <h4>Wednesday - {this.state.wednesday}</h4>
                                <h4>Thursday - {this.state.thursday}</h4>
                                <h4>Friday - {this.state.friday}</h4>
                                <h4>Saturday - {this.state.saturday}</h4>
                                <h4>Sunday - {this.state.sunday}</h4>
                                <br/>
                                <p>Please only assign workers on available days <br/> unless in an emergency.</p>
                            </div>
                            {/*Select box for Admin to set worker's shift*/}
                            <form className={'formShift'} onSubmit={this.handleSubmit}>
                                <a className="backShift" href={"/dashboard"}><i className="arrowShift leftShift"></i>back</a>
                                <h1>Set Worker's Shifts This Month</h1>

                                <h4 className={'days'}>Date:</h4>
                                <input type={'date'} name={'date'} value={this.state.date} onChange={this.handleChange} required/>

                                <select className={'dropdownShift'} name={'dateAssigned'} onChange={this.handleChange}>
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