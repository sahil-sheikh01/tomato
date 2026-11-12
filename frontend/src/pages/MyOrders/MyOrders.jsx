import { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const { token, backendUrl } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(backendUrl + "/api/order/user-orders", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if(token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((order, index) => (
                        <div key={index} className='order'>
                            <img src={assets.parcel_icon} />
                            <p>{order.items.map((item, index) => {
                                if(index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity;
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>

                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span> &#x25cf; </span>
                                <b>{order.status}</b>
                            </p>
                            <button>Track Order</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyOrders