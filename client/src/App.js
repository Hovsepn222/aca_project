import './App.css';
import Header from './components/Header/Header';
import CarouselComponent from './components/carousel';
import SideNavigation from './components/sidenav';
import { ProductItem } from './components/productItem/ProductItem';
import { Typography } from "@mui/material";
import getToken from './components/useToken'

export default function App() {
  return (
    <div >
      <CarouselComponent />
      <Typography variant="h2" sx={{ color: "#86c232", textAlign: "center", mb: "50px", mt: "50px" }}>Recently Added</Typography>
      <ProductItem />
      {console.log(getToken())}
    </div>
  )
}
