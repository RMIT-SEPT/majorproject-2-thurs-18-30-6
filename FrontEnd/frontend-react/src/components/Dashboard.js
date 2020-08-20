import React, { Component } from 'react'
import Person from './Persons/Person'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Hi nothing to see here (from Dashboard.js)</h1>
                <Person/>
            </div>
        )
    }
}

export default Dashboard;
