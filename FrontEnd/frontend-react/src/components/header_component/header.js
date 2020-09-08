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
                <div className={'title'}>
                    AGME BOOKING
                </div>

                <nav className={'navbar'}>
                    <ul className={'list'}>
                        <li className={"loginHead"}><a href={"/login"}> Login </a></li>
                        <li><a href={"/register"}> Register </a></li>
                    </ul>

                </nav>
            </header>
        );
    }
}

export default Header;