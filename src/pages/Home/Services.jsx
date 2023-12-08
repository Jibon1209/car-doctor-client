import { data } from "autoprefixer";
import { useEffect } from "react";
import { useState } from "react"
import Service from "./Service";

const Services = () => {
    const [services,setServices] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            setServices(data);
        })
    },[])
  return (
    <div className="mt-4">
        <div className="text-center">
            <h3 className="text-base text-orange-600">Service</h3>
            <h2 className="text-3xl font-bold">Our Service Area </h2>
            <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
            services.map(service => <Service key={service._id} service={service}></Service>)
        }
        </div>
    </div>
  )
}

export default Services