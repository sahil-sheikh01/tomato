import './Explore.css'
import { menu_list } from '../../assets/assets'

const Explore = ({ category, setCategory }) => {

  return (
    <div className='menu' id='explore-menu'>
      <h1 className='menu-heading'>Explore Our Menu</h1>
      <p className='menu-subheading'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>

      <div className='menu-list'>
        {
          menu_list.map((item, index) => (
            <div
              key={index}
              className='menu-list-item'
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))
        }
      </div>

      <hr />
    </div>
  )
}

export default Explore