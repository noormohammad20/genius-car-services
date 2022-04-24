import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import auth from '../../../firebase.init'
import useServiceDetail from '../../../hooks/useServiceDetail'

const CheckOut = () => {
    const { serviceId } = useParams()
    const [service] = useServiceDetail(serviceId)
    const [user] = useAuthState(auth)

    const handlePlaceOrder = e => {
        e.preventDefault()
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Service : {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" name="name" value={user.displayName} placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" name="email" value={user.email} placeholder='Email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" name="service" value={service.name} placeholder='Service' required />
                <br />
                <input className='w-100 mb-2' type="text" name="address" autoComplete='off' placeholder='Address' />
                <br />
                <input className='w-100 mb-2' type="number" name="phone" placeholder='Phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    )
}

export default CheckOut