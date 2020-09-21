import React, {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

class ViewShifts extends Component {
    constructor(props){
        super(props);

        this.state = {
            loggedInStatus: sessionStorage.getItem('loggedInStatus'),
            user: sessionStorage.getItem('user'),
            code: ""
        }

        const user = JSON.parse(this.state.user)
        axios.post("http://localhost:8080/getShift", {
            userId: user['userId']
        }).then(response => {
            console.log('stuff', response.data)
            const count = response.data['length']

            let htmlCode = ""
            for(let i = 0; i < count; i++){
                // Response is just "assigned" but no day so need to talk to nam about it
                htmlCode += "<h4>" + response.data[i]['assigned'] + "</h4>"
            }

            this.setState({code: htmlCode})

        })
    }


    render() {
        return (
            <div>

                <h2>Assigned Shifts:</h2>
                {parse(this.state.code)}

                <form action={'/dashboard'}>
                    <button type={'submit'}>Back to dashboard</button>
                </form>

            </div>
        );
    }
}

export default ViewShifts;