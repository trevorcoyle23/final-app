import React from 'react';
import cart_icon from './assets/cart_icon.png';
import logo from './assets/logo.png';

import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();
    const path = location.pathname;


    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="logo" style={{ width: "10%" }} />
                <p>NUEVE Store</p>
            </div>
            <ul className='nav-menu'>
                <li><Link to="/" style={{ textDecoration: 'none' }}>Home</Link>{ path === '/' && <hr/>}</li>
                <li><Link to="/glasses" style={{ textDecoration: 'none' }}>Glasses</Link>{ path === '/glasses' && <hr/>}</li>
                <li><Link to="/watches" style={{ textDecoration: 'none' }}>Watches</Link>{ path === '/watches' && <hr/>}</li>
                <li><Link to="/cologne" style={{ textDecoration: 'none' }}>Cologne</Link>{ path === '/cologne' && <hr/>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to="/signin"><button>Sign In</button></Link>
                <Link to="/cart"><img src={cart_icon} alt='shopping-cart' /></Link>
                <div className='nav-cart-count'>0</div>
            </div>
        </div>
    );
};

export default Navbar;