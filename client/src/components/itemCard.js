import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiUrl } from "../apiConfig";
import getToken from "./useToken";

const StyledCard = styled(Card)`
  width: 300px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 10px;
  margin-top: 50px;
  position: relative;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
`;

const StyledButton = styled(Button)`
  color: #86c232 !important;
  position: absolute;
  bottom: 10px; /* Adjust the value to control the vertical position */
  right: -15px; /* Adjust the value to control the horizontal position */
`;

const ItemCard = (props) => {
  const { id, userId, categoryId, itemName, description, price, currency, location, image } = props;

  const handleClick = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/addfavorite/${id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <StyledCard>
      <StyledCardMedia component="img" image={image} alt="Product Image" />
      <StyledCardContent>
        <Link to={`/item/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6" component="div" gutterBottom>
            {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Typography variant="body5" color="text.secondary" gutterBottom>
            {location}
          </Typography>
        </Link>
        <Typography variant="h6" component="div">
          {price} {currency}
        </Typography>
      </StyledCardContent>
      <StyledButton size="small" onClick={() => handleClick(id)} startIcon={<FavoriteIcon />}>
        Favorite
      </StyledButton>
    </StyledCard>
  );
};

export default ItemCard;
