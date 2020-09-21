import React from 'react';
import { render } from '@testing-library/react';
import Registerpage from '../registerpage';


/*
    Check if render in registerpage works
 */
test('Check If registerpage Renders Correctly', () => {
    const div = document.createElement("div");
    render(<Registerpage></Registerpage>,div);
})