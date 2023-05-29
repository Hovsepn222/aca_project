import { Link, useParams } from 'react-router-dom';
import { apiUrl, POST } from '../apiConfig';
import { useEffect, useState } from 'react';
import favorite from "./productItem/images/Favorite.png";
import LinearColor from './loader';
import ItemCard from './itemCard';

const SearchedItems = () => {
  const { searchKeyword } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/search/${searchKeyword}`, POST);
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [searchKeyword]);

  const ProductItems = () => {
    if (!data) {
      return (<LinearColor/>);
    }
    return data.map((item) => {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginLeft: "55px"}}>
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
      </div>
    )});
  };

  useEffect(() => {
    if (data) {
      ProductItems();
    }
  }, [data]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px"}}>
    <ProductItems />
    </div>
  );
};

export default SearchedItems;