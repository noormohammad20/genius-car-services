import React from 'react'
import google from '../../../images/social/google.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/github.png'
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../Shared/Loading/Loading'

const SocialLogin = () => {
    const [signInWithGoogle, user, googleLoading, googleError] = useSignInWithGoogle(auth)
    const [signInWithGithub, user1, githubLoading, githubError] = useSignInWithGithub(auth)
    const [signInWithFacebook, user2, facebookLoading, facebookError] = useSignInWithFacebook(auth)
    const navigate = useNavigate()
    const location = useLocation()

    let from = location.state?.from?.pathname || "/"

    let errorElement

    if (googleLoading || githubLoading || facebookLoading) {
        return <Loading></Loading>
    }

    if (googleError || githubError || facebookError) {
        errorElement = <p className='text-danger'>Error: {googleError?.message} {githubError?.message} {facebookError?.message}</p>
    }
    if (user || user1 || user2) {
        navigate(from, { replace: true })
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div>
            {errorElement}
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-info w-50 d-block mx-auto my-4'>
                    <img style={{ width: '30px' }} src={google} alt="" />
                    <span className='px-2'> Google Sign In</span>
                </button>
                <button
                    onClick={() => signInWithFacebook()}
                    className='btn btn-info w-50 d-block mx-auto my-4'>
                    <img style={{ width: '30px' }} src={facebook} alt="" />
                    <span className='px-2'> Facebook Sign In</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-info w-50 d-block mx-auto my-4'>
                    <img style={{ width: '30px' }} src={github} alt="" />
                    <span className='px-2'> Github Sign In</span>
                </button>
            </div>
        </div>
    )
}

export default SocialLogin