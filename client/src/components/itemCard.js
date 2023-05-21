import React from "react";
import favorite from "./productItem/images/Favorite.png"

const ItemCard = (props) => {
    const { id, userId, categoryId, itemName, description, price, currency, location, image } = props;

    return (<div className="productCard" key={id}>
    <div className="topGroup">
    <a href={`/item/${id}`} style={{textDecoration: "none", color: "white"}}>
      <img src={image} className="productImg" alt="Product-alt" />
      <img src={favorite} className="favoriteIcon" alt="favorite-icon"/>
      </a>
    </div>
    <a href={`/item/${id}`} style={{textDecoration: "none", color: "white"}}>
    <div className="productName">{itemName}</div>
    <div className="productDescription">{description}</div>
    <div className="productName">{location}</div>
    <div className="bottomGroup">
     <div className="productPrice">{price}</div>
       <div >{currency}</div>
    </div>
    </a>
    </div>)
}
export default ItemCard;
