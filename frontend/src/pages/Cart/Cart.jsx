import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getCartTotal } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <>
      <div className='cart'>
        <div className="cart-headings">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <>
                  <div key={index} className='cart-headings cart-items'>
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </>
              )
            }
          })
        }
      </div>

      <div className='cart-bottom'>
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
          <button onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="promocode">
          <p>If you have a promo code, type it here.</p>
          <div className="promocode-input">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Cart