import { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getCartTotal, token, foodList, cartItems, backendUrl } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotal() + 2
    }

    let response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Error!");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
      toast.error("Please login to continue!");
    }
    else if (getCartTotal() === 0) {
      navigate('/cart');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="left-section">
        <p className='title'>Delivery Information</p>

        <div className="multi-fields">
          <input onChange={onChangeHandler} type="text" name='firstName' value={data.firstName} placeholder='First Name' required />
          <input onChange={onChangeHandler} type="text" name='lastName' value={data.lastName} placeholder='Last Name' required />
        </div>

        <input onChange={onChangeHandler} type="email" name='email' value={data.email} placeholder='Email Address' required />
        <input onChange={onChangeHandler} type="text" name='street' value={data.street} placeholder='Street' required />

        <div className="input-fields">
          <input onChange={onChangeHandler} type="text" name='city' value={data.city} placeholder='City' required />
          <input onChange={onChangeHandler} type="text" name='state' value={data.state} placeholder='State' required />
        </div>

        <div className="multi-fields">
          <input onChange={onChangeHandler} type="text" name='zipcode' value={data.zipcode} placeholder='Zipcode' required />
          <input onChange={onChangeHandler} type="text" name='country' value={data.country} placeholder='Country' required />
        </div>

        <input onChange={onChangeHandler} type="text" name='phone' value={data.phone} placeholder='Phone' required />
      </div>

      <div className="right-section">
        <div className="cart-totals">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-totals-details">
              <p>Subtotal</p>
              <p>${getCartTotal()}.00</p>
            </div>
            <hr />

            <div className="cart-totals-details">
              <p>Delivery Charges</p>
              <p>${getCartTotal() === 0 ? 0 : 2}.00</p>
            </div>
            <hr />

            <div className="cart-totals-details">
              <b>Total</b>
              <b>${getCartTotal() === 0 ? 0 : getCartTotal() + 2}.00</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder