import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-menu">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} />
          <p>Add Products</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} />
          <p>Products List</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} />
          <p>All Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar