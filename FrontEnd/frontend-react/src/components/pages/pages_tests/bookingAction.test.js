import React from 'react';
import { render } from '@testing-library/react';
import BookingAction from "../bookingAction";

/*
    Check if render works with Customer
 */
test('Check If page Renders Correctly Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<BookingAction/>)
})

/*
    Check if render works with Worker
 */
test('Check If page Renders Correctly Worker', () => {
    const user = {
        role: 'Worker'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<BookingAction/>)
})