import React from 'react';
import { render } from '@testing-library/react';
import CompanyDetailsPage from "../companyDetailsPage";

/*
    Check if render works
 */
test('Check If page Renders Correctly', () => {
   sessionStorage.setItem('fromSelectCompany', 'True')
    render(<CompanyDetailsPage/>)
})