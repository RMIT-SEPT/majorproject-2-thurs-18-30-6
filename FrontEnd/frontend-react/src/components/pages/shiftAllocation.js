import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';

class ShiftAllocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            username: "rod",
            monday: null,
            tuesday: null,
            wednesday: null,
            thursday: null,
            friday: null,
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
        //whatevet f
    }




    render() {
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

                        <form className={'formAvailability'} onSubmit={this.handleSubmit}>
                            <h1>Set Services Schedule for this Week</h1>
                            <h4 className={'days'}>Monday:</h4>
                            <select className={"dropdownAvail"} name={'monday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>

                            <h4 className={'days'}>Tuesday:</h4>
                            <select className={"dropdownAvail"} name={'tuesday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>

                            <h4 className={'days'}>Wednesday:</h4>
                            <select className={"dropdownAvail"} name={'wednesday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>

                            <h4 className={'days'}>Thursday:</h4>
                            <select className={"dropdownAvail"} name={'thursday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>

                            <h4 className={'days'}>Friday:</h4>
                            <select className={"dropdownAvail"} name={'friday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>

                            <h4 className={'days'}>Saturday:</h4>
                            <select className={"dropdownAvail"} name={'saturday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>

                            <h4 className={'days'}>Sunday:</h4>
                            <select className={"dropdownAvail"} name={'sunday'} onChange={this.handleChange}>
                                <option value={'9-5'}>9-5</option>
                                <option value={'6-2'}>6-2</option>
                            </select>
                            <br/>
                            <button className ={'submitAvail'} type={'submit'}> Submit </button>
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

export default ShiftAllocation;