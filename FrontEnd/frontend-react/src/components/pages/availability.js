import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import '../../assets/availability.css';

class Availability extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            monday: "Unavailable",
            tuesday: "Unavailable",
            wednesday: "Unavailable",
            thursday: "Unavailable",
            friday: "Unavailable",
            redirect: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        const user = JSON.parse(this.state.user)
        console.log('user', user['username'])
        if(this.state.monday === 'Available'){
            axios.post("http://localhost:8080/setAvailability", {
                username: user['username'],
                timeslot: "Monday",
                availability: "Available"
            })
        }
        if(this.state.tuesday === 'Available'){
            axios.post("http://localhost:8080/setAvailability", {
                username: user['username'],
                timeslot: "Tuesday",
                availability: "Available"
            })
        }
        if(this.state.wednesday === 'Available'){
            axios.post("http://localhost:8080/setAvailability", {
                username: user['username'],
                timeslot: "Wednesday",
                availability: "Available"
            })
        }
        if(this.state.thursday === 'Available'){
            axios.post("http://localhost:8080/setAvailability", {
                username: user['username'],
                timeslot: "Thursday",
                availability: "Available"
            })
        }
        if(this.state.friday === 'Available'){
            axios.post("http://localhost:8080/setAvailability", {
                username: user['username'],
                timeslot: "Friday",
                availability: "Available"
            })
        }

        this.setState({redirect: '/dashboard'});
        event.preventDefault();


    }


    render() {
        if(this.state.redirect !== ""){
            return <Redirect to={this.state.redirect} />
        }
        else{
            const user = JSON.parse(this.state.user)
            if(this.state.loggedInStatus){
                if(user['role'] === "Worker"){
                    return (
                        <div>
                            {/*form showing monday - friday, tick which is available*/}
                            <form className={'formAvailability'} onSubmit={this.handleSubmit}>
                                <h1>Set Your Availability:</h1>
                                <h4 className={'days'}>Monday:</h4>
                                <select className={"dropdownAvail"} name={'monday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
                                </select>

                                <h4 className={'days'}>Tuesday:</h4>
                                <select className={"dropdownAvail"} name={'tuesday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
                                </select>

                                <h4 className={'days'}>Wednesday:</h4>
                                <select className={"dropdownAvail"} name={'wednesday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
                                </select>

                                <h4 className={'days'}>Thursday:</h4>
                                <select className={"dropdownAvail"} name={'thursday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
                                </select>

                                <h4 className={'days'}>Friday:</h4>
                                <select className={"dropdownAvail"} name={'friday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
                                </select>

                                <h4 className={'days'}>Saturday:</h4>
                                <select className={"dropdownAvail"} name={'saturday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
                                </select>

                                <h4 className={'days'}>Sunday:</h4>
                                <select className={"dropdownAvail"} name={'sunday'} onChange={this.handleChange}>
                                    <option value={'Unavailable'}>Unavailable</option>
                                    <option value={'Available'}>Available</option>
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
}

export default Availability;