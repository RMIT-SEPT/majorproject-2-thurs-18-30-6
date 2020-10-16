import React from 'react';
import { render } from '@testing-library/react';
import ViewBookings from "../viewBookings";

/*
    Check if render works with Customer
 */
test('Check If page Renders Correctly Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<ViewBookings/>)
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
    render(<ViewBookings/>)
})

/*
    Check if render works with Admin
 */
test('Check If page Renders Correctly Admin', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<ViewBookings/>)
})