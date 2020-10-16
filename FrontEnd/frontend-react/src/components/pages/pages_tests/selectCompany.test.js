import React from 'react';
import { render } from '@testing-library/react';
import SelectCompany from "../selectCompany";

/*
    Check if render works with Customer
 */
test('Check If page Renders Correctly Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<SelectCompany/>)
})