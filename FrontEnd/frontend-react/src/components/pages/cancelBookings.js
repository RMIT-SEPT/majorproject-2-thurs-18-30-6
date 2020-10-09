import React, {Component} from 'react';
import axios from "axios";
import parse from "html-react-parser/index";
import {Redirect} from "react-router-dom";

class CancelBookings extends Component {

    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            bookingCode: "",
            chosenBooking: "",
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const user = JSON.parse(this.state.user);

        axios.post("http://localhost:8080/getBookings", {

            userId: user['userId']

        }).then(response => {

            console.log('response', response.data)

            let bookingCode = "<option> - </option>";
            for(let i = 0; i < response.data['length']; i++){
                bookingCode += "<option value=" + response.data[i]['bookingId'] + ">" + response.data[i]['stringDate'] + "</option>"

            }

            this.setState({bookingCode: bookingCode});



        }).catch(errors => {

            console.log('errors', errors.data)

        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){

        axios.post("http://localhost:8080/cancelBooking",{
            bookingId: parseInt(this.state.chosenBooking)

        }).then(response => {
            alert("Booking Cancelled")
            this.setState({redirect: "/dashboard"})
        }).catch(error => {
            alert("Error")
        })


        event.preventDefault()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select name={'chosenBooking'} onChange={this.handleChange}>
                        {parse(this.state.bookingCode)}
                    </select>
                    <button type={'submit'}> Select </button>
                </form>
            </div>
        );
    }
}

export default CancelBookings;