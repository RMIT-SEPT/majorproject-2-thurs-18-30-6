import React, {Component} from 'react';
import axios from 'axios';
import parse from "html-react-parser/index";

class ViewBookings extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            bookingCode: ""
        }

        const user = JSON.parse(this.state.user);

        axios.post("http://localhost:8080/getBookings", {

            userId: user['userId']

        }).then(response => {

            console.log('response', response.data)

            let bookingCode = "";
            for(let i = 0; i < response.data['length']; i++){
                bookingCode += "<tr>";
                bookingCode += "<td>" + response.data[i]['stringDate']  + "</td>";
                bookingCode += "<td>" + response.data[i]['timeslot'] + "</td>";
                bookingCode += "</tr>";
            }

            this.setState({bookingCode: bookingCode});



        }).catch(errors => {

            console.log('errors', errors.data)

        })
    }

    render() {
        return (
            <div>

                <h2>Your Bookings:</h2>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Time (24 hour format)</th>
                        <th>Cancel Booking</th>
                    </tr>
                    {parse(this.state.bookingCode)}
                </table>

                <p>Note: You may only cancel bookings within the first 48 hours of creation.</p>
            </div>
        );
    }
}

export default ViewBookings;