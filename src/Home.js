import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/SignIn"><button>Sign In</button></Link>
            <Link to="/SignUp"><button>Sign Up</button></Link>
        </div>
    );
} export default Home;