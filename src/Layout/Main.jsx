import { Outlet } from "react-router-dom"
import Footer from "../pages/Shared/Footer"
import NavBar from "../pages/Shared/NavBar"

const Main = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Main