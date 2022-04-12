import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const navigate = useNavigate()

    const navigateLogin = () => {
        navigate('/login')
    }
    const handleRegister = e => {
        e.preventDefault()
    }
    return (
        <div className='register-form'>
            <h2 style={{ textAlign: 'center' }}>Register Please</h2>
            <form onSubmit={handleRegister} >
                <input type="text" name="text" id="text" placeholder='Your Name' required />

                <input type="email" name="Email" id="email" placeholder='Email Address' />

                <input type="password" name="Password" id="password" placeholder='Password' required />

                <input type="password" name="Confirm-password" id="confirm-password" placeholder='Confirm Password' required />

                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to='/login' onClick={navigateLogin} className='text-danger pe-auto text-decoration-none'>Please Login</Link></p>
        </div >
    )
}

export default Register