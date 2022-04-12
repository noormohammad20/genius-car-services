import React from 'react'
import sleep from '../../../images/sleep.jpg'

const NotFound = () => {
    return (
        <div>
            <h1 className='text-center text-primary'>Mechanic Is Sleeping</h1>
            <img className='w-100' src={sleep} alt="" />
        </div>
    )
}

export default NotFound