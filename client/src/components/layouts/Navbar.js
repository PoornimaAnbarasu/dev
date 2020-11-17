import React from 'react';
import {Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav>
        <h1>Dev connector</h1>
        <ul>
            
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
    )
}

export default Navbar
