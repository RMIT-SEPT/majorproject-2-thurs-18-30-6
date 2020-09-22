import React, {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Header from "../header_component/header";
import Footer from "../footer_component/footer";

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
                htmlCode += "<h4 style='padding-left: 50px;'>" + response.data[i] + ": 9am - 5pm</h4>"
            }

            this.setState({code: htmlCode})

        })
    }


    render() {
        return (
            <div>
                {/*show shifts allocated if there is any*/}
                <Header/>
                <a className="backShift" href={"/dashboard"}><i className="arrowShift leftShift"></i>back</a>
                <h2 align={'center'}>Assigned Shifts this week</h2>

                {parse(this.state.code)}

                <Footer/>
            </div>
        );
    }
}

export default ViewShifts;