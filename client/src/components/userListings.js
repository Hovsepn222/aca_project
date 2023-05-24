import { apiUrl } from '../apiConfig';
import { useEffect, useState } from 'react';
import favorite from "./productItem/images/Favorite.png"
import LinearColor from './loader';
import getToken from './useToken';
import { Link, Navigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { Typography } from "@mui/material";
import { UserLoggedStatus } from './loggedInStatus';



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
      } catch (error) {
        console.error("Error fetching data:", error);
      }};
    fetchData()
  }, []);

  const ProductItems = () => {
    if (!UserLoggedStatus()) {
      return (
          <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>You're Not Logged In</Typography>
      )}
    if (data.length === 0) {
      return (<Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>
      Checking...
      <LinearColor />
    </Typography>);
    }
    if (data["message"]) {
      if (data["message"] === "No Items listed") {
        return (
          <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>
            You don't have anything listed.
          </Typography>
        );
      }
    }
    if (data) {
        try {
            return data.map((item) => {
            return (
            <div className="productCard" key={item.id}>
                <div className="topGroup">
                <Link to={`/item/${item.id}`} style={{textDecoration: "none", color: "white"}}>
                <img src={item.image} className="productImg" alt="Product-alt" />
                <img src={favorite} className="favoriteIcon" alt="favorite-icon"/>
                </Link>
                <Link to={`/delete/${item.id}`} style={{ textDecoration: "none", color: "white" }}>
                <AiFillDelete className="deleteIcon" />
            </Link>
                </div>
                <Link to={`/item/${item.id}`} style={{textDecoration: "none", color: "white"}}>
                <div className="productName">{item.item_name}</div>
                <div className="productDescription">{item.description}</div>
                <div className="productName">{item.location}</div>
                <div className="bottomGroup">
                <div className="productPrice">{item.price}</div>
                <div >{item.currency}</div>
            </div>
            </Link>
            </div>
            )}
        )}
        catch(e) {
          Navigate('/login')
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