import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth'
import './Register.css'
import auth from '../../../firebase.init'
import SocialLogin from '../SocialLogin/SocialLogin'
import Loading from '../../Shared/Loading/Loading'
import PageTitle from '../../Shared/PageTitle/PageTitle'


const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true })
    const [updateProfile, updating, updateError] = useUpdateProfile(auth)

    const navigate = useNavigate()

    const navigateLogin = () => {
        navigate('/login')
    }

    if (user) {
        console.log('user', user)
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    let errorElement
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value


        if (password !== confirmPassword) {
            return
        }

        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name })
        console.log('Updated profile')
        navigate('/home')

    }
    return (
        <div className='register-form'>
            <PageTitle title="Register"></PageTitle>
            <h2 className='text-center text-primary my-4'>Register Please</h2>
            <form onSubmit={handleRegister} >
                <input type="text" name="text" id="text" placeholder='Your Name' required />

                <input type="email" name="email" id="email" placeholder='Email Address' />

                <input type="password" name="password" id="password" placeholder='Password' required />

                <input type="password" name="confirmPassword" id="confirm-password" placeholder='Confirm Password' required />

                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label className={`ps-2 ${agree ? '' : 'text-danger'}`} htmlFor="terms">Accept Genius Car Terms And Condition</label>

                <input
                    disabled={!agree}
                    className='w-50 d-block mx-auto btn btn-primary mt-2' type="submit"
                    value="Register" />
            </form>
            {errorElement}
            <p>Already have an account? <Link to='/login' onClick={navigateLogin} className='text-primary pe-auto text-decoration-none'>Please Login</Link></p>
            <SocialLogin></SocialLogin>

        </div >
    )
}

export default Register