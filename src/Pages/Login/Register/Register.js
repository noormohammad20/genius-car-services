import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import './Register.css'
import auth from '../../../firebase.init'
import SocialLogin from '../SocialLogin/SocialLogin'

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth)
    const navigate = useNavigate()

    const navigateLogin = () => {
        navigate('/login')
    }
    if (user) {
        navigate('/home')
    }
    let errorElement
    if (error) {
        errorElement = <div>
            <p className='text-danger'>Error: {error?.message}</p>
        </div>
    }
    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        if (password !== confirmPassword) {
            return
        }

        createUserWithEmailAndPassword(email, password)
    }
    return (
        <div className='register-form'>
            <h2 style={{ textAlign: 'center' }}>Register Please</h2>
            <form onSubmit={handleRegister} >
                <input type="text" name="text" id="text" placeholder='Your Name' required />

                <input type="email" name="email" id="email" placeholder='Email Address' />

                <input type="password" name="password" id="password" placeholder='Password' required />

                <input type="password" name="confirmPassword" id="confirm-password" placeholder='Confirm Password' required />

                <input type="submit" value="Register" />
            </form>
            {errorElement}
            <p>Already have an account? <Link to='/login' onClick={navigateLogin} className='text-danger pe-auto text-decoration-none'>Please Login</Link></p>
            <SocialLogin></SocialLogin>
        </div >
    )
}

export default Register