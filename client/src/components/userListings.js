import { apiUrl } from '../apiConfig';
import { useEffect, useState } from 'react';
import favorite from "./productItem/images/Favorite.png"
import LinearColor from './loader';
import getToken from './useToken';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { Typography } from "@mui/material";


const UserListings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/mylistings`, {
            method: "POST",
            mode: 'cors',
            headers: {
              Authorization: 'Bearer ' + getToken()
            }});
        const jsonData = await res.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }};
    fetchData()
  }, []);

  const ProductItems = () => {
    if (!data.length) {
      return (<LinearColor/>);
    }
    if (data) {
        try {
            return data.map((item) => {
            return (
            <div className="productCard" key={item.id}>
                <div className="topGroup">
                <a href={`/item/${item.id}`} style={{textDecoration: "none", color: "white"}}>
                <img src={item.image} className="productImg" alt="Product-alt" />
                <img src={favorite} className="favoriteIcon" alt="favorite-icon"/>
                </a>
                <Link to={`/delete/${item.id}`} style={{ textDecoration: "none", color: "white" }}>
                <AiFillDelete className="deleteIcon" />
            </Link>
                </div>
                <a href={`/item/${item.id}`} style={{textDecoration: "none", color: "white"}}>
                <div className="productName">{item.item_name}</div>
                <div className="productDescription">{item.description}</div>
                <div className="productName">{item.location}</div>
                <div className="bottomGroup">
                <div className="productPrice">{item.price}</div>
                <div >{item.currency}</div>
            </div>
            </a>
            </div>
            )}
        )}
        catch(e) {
            return (
                <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>You're Not Logged In</Typography>
            )
        }}
  };

  useEffect(() => {
    if (data) {
      ProductItems();
    }
  });

    return (
        <>        
        {data.length && (
          <div>
            <Typography variant="h4" sx={{ color: "white", textAlign: "center",mb: "50px", mt: "50px" }}>My Listings</Typography>
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <ProductItems />
        </div>
        </>
      );
};

export default UserListings;