/*
    JS file for header of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import '../../assets/header.css';

class Header extends Component {
    render() {
        return (
            <header className={'header'}>

                {/*Div for Website Logo (insert ref to logo image)*/}
                <div className={'logo'}>
                    HEADER LOGO
                </div>

                {/*navbar for website (css later)*/}
                <nav className={'navbar'}>
                    <ul className={'list'}>
                        <li className={'mainNav'}><a href={"/"}> Home </a></li>
                        <li className={'mainNav'}><a href={"/"}> Available Services </a></li>
                        <li className={'mainNav'}><a href={"/"}> Make a Booking </a></li>
                        <li className={'loginNav'}><a href={"/login"}> Login </a></li>
                        <li className={'registerNav'}><a href={"/"}> Register </a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;