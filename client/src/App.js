import './App.css';
import Header from './components/Header/Header';
import CarouselComponent from './components/carousel';
import SideNavigation from './components/sidenav';
import { ProductItem } from './components/productItem/ProductItem';

export default function App() {
  return (
    <div >
      <Header />
      <CarouselComponent />
      
      <ProductItem />
    </div>
  )
}
