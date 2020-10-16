import React from 'react';
import { render } from '@testing-library/react';
import CompanyAndServices from "../companyAndServices";

/*
    Check if render works with Customer
 */
test('Check If page Renders Correctly Customer', () => {
    const user = {
        role: 'Customer'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<CompanyAndServices/>)
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
    render(<CompanyAndServices/>)
})