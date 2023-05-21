import './App.css';
import Header from './components/Header/Header';
import CarouselComponent from './components/carousel';
import SideNavigation from './components/sidenav';
import { ProductItem } from './components/productItem/ProductItem';
import { Typography } from "@mui/material";

export default function App() {
  return (
    <div >
      <CarouselComponent />
      <Typography variant="body1" sx={{ color: "#86c232"}}>Recently Added</Typography>
      <ProductItem />
    </div>
  )
}
