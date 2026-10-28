import { useContext } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="image-container">
            <img className='food-image' src={image} alt="" />
            {
                !cartItems[id] ? 
                <img className='add-icon' onClick={() => addToCart(id)} src={assets.add_icon_white} />
                : 
                <div className='counter'>
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        
        <div className="food-details">
            <div className="food-name">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>

            <p className="food-description">{description}</p>

            <p className="food-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodItem