import React from 'react';
import { render } from '@testing-library/react';
import ViewWorkers from "../viewWorkers";

/*
    Check if render works
 */
test('Check If page Renders Correctly', () => {
    const user = {
        role: 'Admin'
    }
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('loggedInStatus', 'True')
    render(<ViewWorkers/>)
})
