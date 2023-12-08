import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Context/AuthProvider"
import BookingRow from "./BookingRow";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();
    const url = `/bookings?email=${user?.email}`;

    useEffect(() => {
        // axios.get(url,{withCredentials: true})
        //     .then(res => {
        //         setBookings(res.data);
        //     })    
               axiosSecure.get(url) 
               .then(res => {
                        setBookings(res.data);
                    }) 
    }, [url,axiosSecure])

    const handleDelete = id =>{
        const proceed = confirm('Are you sure you want to delete');
        if(proceed)
        {
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'

            })
            .then(res=> res.json())
            .then(date=>{
                if(date.deletedCount >0)
                {
                    alert('Deleted successful');
                    const remaining = bookings.filter(book=>book._id !== id)
                    setBookings(remaining);
                }
            })
        }

    }
    const handleBookingConfirm = id=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify({status: 'confirm'})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0)
            {
                alert('Update successfully')
                const remaining = bookings.filter(book=>book._id !== id );
                const updated = bookings.find(book=> book._id === id);
                updated.status = 'confirm';
                const newBookings = [updated, ...remaining]                
                setBookings(newBookings);
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Service</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {
                            bookings.map(booking=><BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}></BookingRow>)
                        }                      
                    </tbody>

                </table>
            </div>
        </div>

    )
}

export default Bookings