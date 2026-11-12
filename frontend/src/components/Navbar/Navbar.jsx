import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("Home");

  const { token, setToken, getCartTotal } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

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
          <img src={assets.search_icon} />
        </div>

        <div className="navbar-basket">
          <Link to='/cart'>
            <img src={assets.basket_icon} />
          </Link>
          <div className={getCartTotal() === 0 ? "" : "dot"}></div>
        </div>
        {
          !token ?
          <button onClick={() => setShowLogin(true)} className='navbar-button'>Sign Up</button> :
          <div className='navbar-profile'>
            <img src={assets.profile_icon} />
            
            <ul className='profile-dropdown'>
              <li onClick={() => navigate('/my-orders')}>
                <img src={assets.bag_icon} />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar