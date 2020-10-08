import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import '../../assets/shiftAllocation.css';
import parse from 'html-react-parser';


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
            redirect: null,
            error: ""
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

        if(chosenYear === currYear && chosenMonth === currMonth && chosenDate >= currDate){

            axios.post("http://localhost:8080/setShift", {
                userId: parseInt(this.state.userId),
                date: send
            }).then(response =>{
                alert('Shift submitted successfully!')
                this.setState({redirect: '/dashboard'})
            }).catch( error => {
                this.setState({error: "Error: Date already assigned for this worker"})
            })
        }else{
            this.setState({error: "Error: Invalid Date, Date should be within this month"})
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
                                <p className={'error'}>{parse(this.state.error)}</p>
                                <h4 className={'days'}>Date:</h4>
                                <input className={'dropdownShift'} type={'date'} name={'date'} value={this.state.date} onChange={this.handleChange} required/>

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