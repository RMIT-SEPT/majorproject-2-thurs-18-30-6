import React from 'react';
import { render } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Loginpage from '../loginpage';

Enzyme.configure({ adapter: new Adapter() });

test('Check email', () => {
    let wrapper;
    wrapper = Enzyme.shallow(<Loginpage></Loginpage>);

    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'winstonl3900@gmail.com'}});
    expect(wrapper.state('email')).toEqual('winstonl3900@gmail.com');
})

/*
    Check if render in loginpage works
 */
test('Check If registerpage Renders Correctly', () => {
    const div = document.createElement("div");
    render(<Loginpage></Loginpage>,div);
})