import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  }

  const removeFood = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, {id});
    await fetchList();

    if(response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='products-list flex-column'>
      <p>Foods List</p>
        <div className="table-headings table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => (
            <div key={index} className='table-row table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cross-icon'>X</p>
            </div>
          ))
        }
    </div>
  )
}

export default List