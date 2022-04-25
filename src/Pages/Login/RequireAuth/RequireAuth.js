import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, useLocation } from 'react-router-dom'
import auth from '../../../firebase.init'
import Loading from '../../Shared/Loading/Loading'
import { useSendEmailVerification } from 'react-firebase-hooks/auth'
import { toast, ToastContainer } from 'react-toastify'
const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const location = useLocation()
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)

    if (loading || sending) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (user?.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center my-5'>
            <h3 className="text-danger my-4">Your Email Is Not Verified</h3>
            <h5 className='text-success my-4'>Please Verify Your Email Address</h5>
            <button
                className='btn btn-primary my-4'
                onClick={async () => {
                    await sendEmailVerification()
                    toast('Sent email')
                }}
            >
                Send Verification Email Again!!
            </button>
            <ToastContainer></ToastContainer>
        </div>
    }
    return children
}

export default RequireAuth