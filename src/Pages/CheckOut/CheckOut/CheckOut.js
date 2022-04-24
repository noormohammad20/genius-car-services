import axios from 'axios'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
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
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const { data } = response
                if (data.insertedId) {
                    toast('Your Order Is Booked!! See You Soon!')
                    e.target.reset()
                }
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Service : {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" name="name" value={user.displayName} placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" name="email" value={user.email} placeholder='Email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" name="service" value={service.name} placeholder='Service' required readOnly />
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