import React from 'react'
import {Link } from "react-router-dom"

const Landing = () => {
    return (
        <section>
            <h1> Developer connect</h1>
            <div>
                <Link to="/register" >Sign Up </Link>
                <Link to="/login" > Login </Link>
            </div>
        </section>
    )
}

export default Landing
