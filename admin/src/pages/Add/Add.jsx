import { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: data.category,
        price: ""
      });
      setImage(false);

      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className='add-products'>
      <form onSubmit={onSubmitHandler} className='flex-column'>
        <div className="product-image flex-column">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>

        <div className="product-name flex-column">
          <p>Product Name</p>
          <input onChange={onChangeHandler} type="text" name='name' value={data.name} placeholder='Greek salad' required />
        </div>

        <div className="product-description flex-column">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} name="description" value={data.description} rows="6" placeholder='Food provides essential nutrients for overall health and well-being' required></textarea>
        </div>

        <div className="category-and-price">
          <div className="product-category flex-column">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="product-price flex-column">
            <p>Product Price</p>
            <input onChange={onChangeHandler} type="number" name='price' value={data.price} placeholder='12' required />
          </div>
        </div>

        <button type='submit' className='add-button'>ADD</button>
      </form>
    </div>
  )
}

export default Add