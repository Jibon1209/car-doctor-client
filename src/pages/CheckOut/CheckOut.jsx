import { useContext } from "react";
import { useLoaderData } from "react-router-dom"
import { AuthContext } from "../../Context/AuthProvider";

const CheckOut = () => {
    const { _id,title,price,img } = useLoaderData();
    const {user} = useContext(AuthContext);

    const handleBookService = (e)=>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            img,
            date, 
            service: title,
            service_id: _id,
            price,
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(date=>{
            console.log(date);
            if(date.insertedId)
            {
                alert('service book successfully')
            }
        })

    }
    return (
        <div>
            <form onSubmit={handleBookService} className="card-body">
                <h2 className="text-3xl text-center">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered"/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" name="date" className="input input-bordered"/>                    
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" defaultValue={user?.email}  className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Due Amount</span>
                    </label>
                    <input type="text" defaultValue={'$' + price} className="input input-bordered" required />                    
                </div>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary btn-block">Order Confirm</button>
                </div>
            </form>
        </div>
    )
}

export default CheckOut