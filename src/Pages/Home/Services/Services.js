import React, { useEffect, useState } from 'react'
import Service from '../Home/Service/Service'
import './Services.css'
const Services = () => {

    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('https://secure-harbor-63739.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (

        <div id='services' className='container'>
            <h1 className='text-primary text-center mt-5 mb-5'>Our Services</h1>
            <div className="services-container">
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }
            </div>
        </div>
    )
}

export default Services