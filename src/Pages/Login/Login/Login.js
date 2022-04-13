import React, { useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import auth from '../../../firebase.init'
import SocialLogin from '../SocialLogin/SocialLogin'

const Login = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/"
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth)

    if (user) {
        navigate(from, { replace: true })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        signInWithEmailAndPassword(email, password)
    }

    const navigateRegister = e => {
        navigate('/register')
    }

    const resetPassword = async () => {
        const email = emailRef.current.value
        await sendPasswordResetEmail(email)
        alert('Sent email')
    }

    return (
        <div className='container w-50 mx-auto'>
            <h2 className='text-primary text-center mt-2'>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3 mt-5" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" password required />
                </Form.Group>
                <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
                    Login
                </Button>
            </Form>
            <p>New To Genius Car? <Link to='/register' onClick={navigateRegister} className='text-primary pe-auto text-decoration-none'>Please Register</Link></p>
            <p>Forget Password? <Link to='/register' onClick={resetPassword} className='text-primary pe-auto text-decoration-none'>Reset Password</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    )
}

export default Login