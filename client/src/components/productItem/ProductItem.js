import React from "react";
// import styled from "styled-components";
import favorite from "./images/Favorite.png"
import product from "./images/product.png"
import star from "./images/Star.svg"
import "./productItem.css"

export const ProductItem = () => {
  return (
    <div className="productCard">
      <div className ="topGroup">
        <img src={product} className="productImg"/>
        <img src={favorite} className="favoriteIcon"/>
      </div>
      <div className="productName">Item Name</div>
      <div className="productDescription">About Item</div>
      <div className="mediumGroup">
        <img className="starIcon" src={star} />
        <img className="starIcon1" src={star} />
        <img className="starIcon1" src={star} />
        <img className="starIcon1" src={star} />
        <img className="starIcon4" src={star} />
        <div className="productRating">5.0</div>
      </div>
      <div className="bottomGroup">
        <div className="productPrice">100$</div>
        <div className="addToCartWrapper">
          <div className="addToCartButton">Add to card</div>
        </div>
      </div>
    </div>
  );
};

// const StarIcon1 = styled.img`
//   width: 16.2px;
//   min-width: 0px;
//   height: 15.4px;
//   min-height: 0px;
//   flex-shrink: 0;
//   margin: 0px 0.42px 0px 0px;
//   box-sizing: border-box;
// `;
// const ProductCard = styled.div`
//   width: 250px;
//   height: 323px;
//   gap: 6px;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: flex-start;
//   border-width: 1px;
//   border-style: solid;
//   border-color: #222629;
//   box-sizing: border-box;
//   background-color: #3b3b3b;
//   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
// `;
// const TopGroup = styled.div`
//   width: 193px;
//   gap: 28px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-self: flex-end;
//   align-items: flex-start;
//   margin: 0px 2px 5px 0px;
//   box-sizing: border-box;
// `;
// const ProductImg = styled.img`
//   width: 142px;
//   min-width: 0px;
//   height: 142px;
//   min-height: 0px;
//   flex-shrink: 0;
//   align-self: flex-end;
//   margin: 6px 0px 0px 0px;
//   box-sizing: border-box;
// `;
// const FavoriteIcon = styled.img`
//   width: 23px;
//   min-width: 0px;
//   height: 22px;
//   min-height: 0px;
//   flex-shrink: 0;
//   box-sizing: border-box;
// `;
// const ProductName = styled.div`
//   width: 62px;
//   height: 15px;
//   flex-shrink: 0;
//   margin: 0px 0px 0px 15px;
//   color: #ffffff;
//   font-size: 12px;
//   font-family: Inter;
//   white-space: nowrap;
//   box-sizing: border-box;
// `;
// const ProductDescription = styled.div`
//   width: 39px;
//   height: 15px;
//   flex-shrink: 0;
//   margin: 0px 0px 13px 15px;
//   color: #ffffff;
//   font-size: 12px;
//   font-weight: 100;
//   font-family: Inter;
//   white-space: nowrap;
//   box-sizing: border-box;
// `;
// const MediumGroup = styled.div`
//   width: 95.6px;
//   gap: 0.42px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   margin: 0px 0px 1px 15.4px;
//   box-sizing: border-box;
// `;
// const StarIcon = styled.img`
//   width: 16.2px;
//   min-width: 0px;
//   height: 15.4px;
//   min-height: 0px;
//   flex-shrink: 0;
//   margin: 0px 0.42px 9.62px 0px;
//   box-sizing: border-box;
// `;
// const StarIcon4 = styled.img`
//   width: 16.2px;
//   min-width: 0px;
//   height: 15.4px;
//   min-height: 0px;
//   flex-shrink: 0;
//   box-sizing: border-box;
// `;
// const ProductRating = styled.div`
//   width: 11px;
//   height: 15px;
//   flex-shrink: 0;
//   align-self: flex-end;
//   color: #ffffff;
//   font-size: 12px;
//   font-weight: 100;
//   font-family: Inter;
//   -webkit-text-stroke-color: transparent;
//   -webkit-text-stroke-width: 2px;
//   white-space: nowrap;
//   -webkit-background-clip: text;
//   box-sizing: border-box;
//   background-image: transparent;
// `;
// const BottomGroup = styled.div`
//   width: 250px;
//   height: 74px;
//   gap: 62px;
//   display: flex;
//   flex-shrink: 0;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-end;
//   margin: 0px 0px 0px -1px;
//   padding: 10px 15px 10px 16px;
//   box-sizing: border-box;
//   background-color: #86c232;
// `;
// const ProductPrice = styled.div`
//   width: 80px;
//   height: 48px;
//   flex-shrink: 0;
//   color: #ffffff;
//   font-size: 40px;
//   font-weight: 700;
//   font-family: Inter;
//   white-space: nowrap;
//   box-sizing: border-box;
// `;
// const AddToCartWrapper = styled.div`
//   width: 91px;
//   height: 28px;
//   display: flex;
//   flex-shrink: 0;
//   flex-direction: column;
//   margin: 0px 0px 6px 0px;
//   padding: 3px 10px;
//   border-radius: 50px;
//   box-sizing: border-box;
//   background-color: #61892f;
// `;
// const AddToCartButton = styled.div`
//   width: 74px;
//   height: 18px;
//   flex-shrink: 0;
//   color: #ffffff;
//   font-size: 15px;
//   font-weight: 300;
//   font-family: Inter;
//   white-space: nowrap;
//   box-sizing: border-box;
// `;
