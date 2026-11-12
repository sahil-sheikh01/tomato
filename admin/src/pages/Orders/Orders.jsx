import { useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list");

    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='orders'>
      <p>All Orders</p>
      <div className="order-list">
        {
          orders.map((order, index) => (
            <div key={index} className='order'>
              <img src={assets.parcel_icon} />
              <div>
                <p className='order-items'>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })
                  }
                </p>
                <p className="customer-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="customer-address">
                  <p>
                    {order.address.street + ","}
                  </p>
                  <p>
                    {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                  </p>
                </div>
                <p className="customer-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders