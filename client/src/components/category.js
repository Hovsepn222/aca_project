import { Link, useParams } from 'react-router-dom';
import { apiUrl, POST } from '../apiConfig';
import { useEffect, useState } from 'react';
import favorite from "./productItem/images/Favorite.png"
import LinearColor from './loader';
import ItemCard from './itemCard';

const Category = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/category/${id}`, POST);
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }};
    fetchData()
  }, [id]);

  const ProductItems = () => {
    if (!data) {
      // Return a loading indicator while waiting for data
      return (<LinearColor />);
    }
    return data.map((item) => {
      return (
        <ItemCard 
      key={item.id}
      id={item.id}
      userId={item.user_id}
      categoryId={item.category_id}
      itemName={item.item_name}
      description={item.description}
      price={item.price}
      currency={item.currency}
      location={item.location}
      image={item.image}/>
    //   <div className="productCard" key={item.id}>
    //     <div className="topGroup">
    //     <Link to={`/item/${item.id}`} style={{textDecoration: "none", color: "white"}}>
    //       <img src={item.image} className="productImg" alt="Product-alt" />
    //       <img src={favorite} className="favoriteIcon" alt="favorite-icon"/>
    //       </Link>
    //     </div>
    //     <Link to={`/item/${item.id}`} style={{textDecoration: "none", color: "white"}}>
    //     <div className="productName">{item.item_name}</div>
    //     <div className="productDescription">{item.description}</div>
    //     <div className="productName">{item.location}</div>
    //     <div className="bottomGroup">
    //      <div className="productPrice">{item.price}</div>
    //        <div >{item.currency}</div>
    //    </div>
    //    </Link>
    //  </div>
    )}
  );
  };
  useEffect(() => {
    if (data) {
      ProductItems();
    }
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    <ProductItems />
    </div>
  );
};

export default Category;