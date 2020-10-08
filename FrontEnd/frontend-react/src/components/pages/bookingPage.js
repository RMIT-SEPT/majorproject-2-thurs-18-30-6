import React, {Component} from 'react';
import axios from "axios";

class BookingPage extends Component {

    constructor(props){
        super(props);

        //states needed for this class
        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            adminId: sessionStorage.getItem('adminId'),
            chosenWorker: "",
            redirect: null,
            timeslot: "",
            date: null,
            code: ""
        }


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleSubmit(event){
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form>
                    <h3>Select a Date:</h3>
                    <input type={"date"} name={"date"} onChange={this.handleChange}></input>
                    <br/>
                    <h3>Select a Timeslot:</h3>
                    <select name={"timeslot"} onChange={this.handleChange}>
                        <option value={"9-10"}>9-10</option>
                        <option value={"10-11"}>10-11</option>
                        <option value={"11-12"}>11-12</option>
                        <option value={"12-13"}>12-13</option>
                        <option value={"13-14"}>13-14</option>
                        <option value={"14-15"}>14-15</option>
                        <option value={"15-16"}>15-16</option>
                        <option value={"16-17"}>16-17</option>
                    </select>
                    <br/>
                    <h3>Select A Worker:</h3>
                    <select></select>
                </form>
            </div>
        );
    }
}

export default BookingPage;
