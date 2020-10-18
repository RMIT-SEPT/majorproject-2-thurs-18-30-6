import React from 'react';
import { render } from '@testing-library/react';
import ServiceDetails from "../serviceDetails";

/*
    Check if render works with Customer
 */
test('Check If page Renders Correctly Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    sessionStorage.setItem('fromCompanyAndServices', 'True')
    render(<ServiceDetails/>)
})