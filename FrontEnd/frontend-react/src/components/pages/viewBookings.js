import React, {Component} from 'react';
import axios from 'axios';

class ViewBookings extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user')
        }

        const user = JSON.parse(this.state.user);

        axios.post("http://localhost:8080/getBookings", {

            userId: user['userId']

        }).then(response => {

            console.log('response', response.data)

        }).catch(errors => {

            console.log('errors', errors.data)

        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ViewBookings;