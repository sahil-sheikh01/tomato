import { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getCartTotal } = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="left-section">
        <p className='title'>Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>

        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' />

        <div className="input-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder='Zipcode' />
          <input type="text" placeholder='Country' />
        </div>

        <input type="text" placeholder='Phone' />
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
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder