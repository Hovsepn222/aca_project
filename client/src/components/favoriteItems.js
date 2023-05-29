import { apiUrl } from '../apiConfig';
import { useEffect, useState } from 'react';
import favorite from "./productItem/images/Favorite.png"
import LinearColor from './loader';
import getToken from './useToken';
import { Typography } from "@mui/material";
import { UserLoggedStatus } from './loggedInStatus';
import ItemCard from './itemCard';


const UserListings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/favorites`, {
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
              You Don't Have Any Favorites.
            </Typography>
          );
        }
      }
    if (data) {
        try {
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
            )}
        )}
        catch(e) {
            return (
                <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>You Don't have Any Favorites</Typography>
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
        {data.length >= 1 && (
            <div>
              <Typography variant="h4" sx={{ color: "white", textAlign: "center",mb: "50px", mt: "50px" }}>Favorites</Typography>
            </div>
          )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <ProductItems />
        </div>
        </>
      );
};

export default UserListings;