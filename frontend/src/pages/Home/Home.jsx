import { useState } from 'react'
import Explore from '../../components/Explore/Explore'
import Header from '../../components/Header/Header'
import './Home.css'
import FoodMenu from '../../components/FoodMenu/FoodMenu'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <Explore category={category} setCategory={setCategory}/>
      <FoodMenu category={category} />
      <AppDownload />
    </div>
  )
}

export default Home