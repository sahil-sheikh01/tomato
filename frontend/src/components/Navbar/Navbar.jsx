import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("Home");

  const { getCartTotal } = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} className='navbar-logo' />
      </Link>

      <ul className='navbar-menu'>
        <Link
          to='/'
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >Home
        </Link>
        <a
          href='#explore-menu'
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >Menu
        </a>
        <a
          href='#app-download'
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >Mobile App
        </a>
        <a
          href='#footer'
          onClick={() => setMenu("Contact-Us")}
          className={menu === "Contact-Us" ? "active" : ""}
        >Contact Us
        </a>
      </ul>

      <div className='navbar-right'>
        <div className="search-icon">
          <img src={assets.search_icon} alt="" />
        </div>

        <div className="navbar-basket">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getCartTotal() === 0 ? "" : "dot"}></div>
        </div>

        <button onClick={() => setShowLogin(true)} className='navbar-button'>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar