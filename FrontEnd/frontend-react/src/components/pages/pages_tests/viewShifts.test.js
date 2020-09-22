import React from 'react';
import { render } from '@testing-library/react';
import ViewShifts from "../viewShifts";

/*
    Check if render works
 */
test('Check If page Renders Correctly Admin', () => {
    const user = {
        role: 'Worker'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<ViewShifts/>)
})
