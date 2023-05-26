import React, {useState} from "react";
import Button from '@mui/material/Button';
import { GrFavorite } from 'react-icons/gr';
import { apiUrl } from '../apiConfig';
import getToken from './useToken';
import { Link } from "react-router-dom";

const ItemCard = (props) => {
    const { id, userId, categoryId, itemName, description, price, currency, location, image } = props;

    const handleClick = async (id) => {
        try {
          const res = await fetch(`${apiUrl}/addfavorite/${id}`, {
              method: "POST",
              mode: 'cors',
              headers: {
                Authorization: 'Bearer ' + getToken()
              }});
        } catch (error) {
          console.error("Error fetching data:", error);
        };
    }

    return (
    <div className="productCard" key={id}>
    <div className="topGroup">
    <Link to={`/item/${id}`} style={{textDecoration: "none", color: "white"}}>
      <img src={image} className="productImg" alt="Product-alt" />
      </Link>
    </div>
    <Link to={`/item/${id}`} style={{textDecoration: "none", color: "white"}}>
    <div className="productName">{itemName}</div>
    <div className="productDescription">{description}</div>
    <div className="productName">{location}</div></Link>
    <div className="bottomGroup">
    <div className="productPrice">{price}</div>
    <div >{currency}</div>
    </div>
    <Button
    style={{ textDecoration: "none", color: "white" }}
    onClick={() => handleClick(id)}
    >
    <GrFavorite className="deleteIcon" />
    </Button>
    </div>
  )
}
export default ItemCard;
