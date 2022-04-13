import React, { useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import auth from '../../../firebase.init'
import Loading from '../../Shared/Loading/Loading'
import SocialLogin from '../SocialLogin/SocialLogin'
import 'react-toastify/dist/ReactToastify.css'

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

    if (loading || sending) {
        return <Loading></Loading>
    }

    let errorElement
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
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
        if (email) {
            await sendPasswordResetEmail(email)
            toast('Sent email')
        }
        else {
            toast('Please Enter Your Email')
        }
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
            {errorElement}
            <p>New To Genius Car? <Link to='/register' onClick={navigateRegister} className='text-primary pe-auto text-decoration-none'>Please Register</Link></p>
            <p>Forget Password? <button onClick={resetPassword} className='btn btn-link text-primary pe-auto text-decoration-none'>Reset Password</button></p>
            <SocialLogin></SocialLogin>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default Login