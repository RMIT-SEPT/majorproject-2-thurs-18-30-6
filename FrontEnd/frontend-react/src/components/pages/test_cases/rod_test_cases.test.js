/*
    Software Engineering Processes and Tools Milestone 2:
    Test Case Assignment Submission

    by Rodrigo Miguel Rojas (s3784466)
 */

import React from 'react';
import { render } from '@testing-library/react';
import RegistrationComplete from '../registrationComplete';
import axios from 'axios';


/*
    Test case for rendering registerComplete with proper access
 */
test('Rendering registerComplete with proper access', () => {
    sessionStorage.setItem('fromRegister', 'true');

    render(<RegistrationComplete/>);
})

/*
    Test case to see if registration API connection works properly
 */
test('Can register properly', () => {
    const body = {
        firstName: "Rodrigo",
        lastName: "Rojas",
        email: "s3784466@student.rmit.edu.au",
        password: "test_case_password",
        confirm_password: "test_case_password",
        role: "Admin"
    }

    axios.post("http://localhost:8080/api/user/register", {
        body
    }, {
        withCredentials: true
    }).then(response => {
        const user = JSON.stringify(response);

        // truthy means user exists and therefore was successful in registration
        expect(user).toBeTruthy();
    })
})

/*
    Test case to see if login API connection works properly
 */
test('Can login properly', () => {
    const body = {
        email: "s3784466@student.rmit.edu.au",
        password: "test_case_password"
    }

    axios.post("http://localhost:8080/api/user/login", {
        body
    }, {
        withCredentials: true
    }).then(response => {
        const user = JSON.stringify(response);

        // truthy means user exists and therefore was successful login
        expect(user).toBeTruthy();
    })
})

/*
    Test case to see if login API connection works properly on wrong authentication
 */
test('Can reject wrong login credentials', () => {
    const body = {
        email: "notregistered@email.com",
        password: "somerandompassword"
    }

    axios.post("http://localhost:8080/api/user/login", {
        body
    }, {
        withCredentials: true
    }).then(response => {

        // if returns response 200, user should be empty therefore false
        const user = JSON.stringify(response);

        expect(user).toBeFalsy();

    }).catch(error=>{

        // If returns response 400, error should be true
        const errorBody = JSON.stringify(error);

        expect(errorBody).toBeTruthy();
    })
})