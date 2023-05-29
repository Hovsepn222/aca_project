import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserLoggedStatus } from './loggedInStatus';
import { apiUrl } from '../apiConfig';
import getToken from './useToken';
import axios from 'axios';
import { Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel, Alert } from '@mui/material';

const ProfileContainer = styled.div`
  padding: 20px;
  margin-left: 280px;
  margin-right: 280px;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 10px;
  .MuiFormLabel-root.Mui-focused {
    color: #86c232;
  }
  .MuiFormLabel-root {
    color: #fff;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #86c232;
      color: #86c232;
    }
    
    color: 'white' !important;
    &:hover fieldset {
      border-color: #86c232;
    }
    &.Mui-focused fieldset {
      border-color: #86c232;
    }
    &::placeholder {
      color: #fff !important;
    }
  }
`;

const SaveButton = styled(Button)`
  margin-top: 50px;
  background-color: #86c232 !important;
  color: white !important;

  &:hover {
    background-color: #86c232 !important;
    opacity: 0.9;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 50px;
  background-color: #86c232 !important;
  color: white !important;

  &:hover {
    background-color: #86c232 !important;
    opacity: 0.9;
  }
`;


const StyledTextField = styled(TextField)`
  margin-bottom: 10px;
  .MuiFormLabel-root.Mui-focused {
    color: #86c232;
  }
  .MuiFormLabel-root {
    color: #fff;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #86c232;
      color: #86c232;
    }
    &:hover fieldset {
      border-color: #86c232;
    }
    &.Mui-focused fieldset {
      border-color: #86c232;
    }
    &::placeholder {
      color: #fff;
    }
  }
`;

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemDescription, setItemDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemImageChange = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const imageDataUrl = event.target.result;
      setItemImage(imageDataUrl);
    };
  
    reader.readAsDataURL(image);
  };
  

  const handleItemDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value)
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemImage === null) {setError("Please Upload An Image")}
    const itemData = {
        "item_name": itemName,
        "image": itemImage,
        "description": itemDescription,
        "category_id": category,
        "price": price,
        "currency": currency,
        "location": location
    };
    try {
        const res = await axios.post(`${apiUrl}/additem`, itemData, {
          headers: {
            "Authorization" : `Bearer ${getToken()}`
          }
        });
        setSuccess(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      };
  };

    if (!UserLoggedStatus()) {
    return (
        <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>You're Not Logged In</Typography>
    )}
    
    return (
      <>
    <ProfileContainer style={{marginTop: '50px', marginBottom: '100px'}}>
        {error && <Typography variant="h6" sx={{ color: "#86c232", textAlign: "center", mb: "25px", mt: "25px" }}>{error}</Typography>}
    <input
    onChange={handleItemImageChange}
    accept="image/*"
    style={{ display: 'none' }}
    id="raised-button-file"
    multiple
    type="file"
    />
<label htmlFor="raised-button-file">
  <StyledButton variant="raised" component="span">
    Upload
  </StyledButton>
</label> 
  {itemImage && <img src={itemImage} alt="Uploaded Item" style={{ width: '100%', marginTop: '10px' }} />}
    <form onSubmit={handleSubmit}>
      <StyledTextField
        label="Item Name"
        value={itemName}
        onChange={handleItemNameChange}
        fullWidth
        required
        margin="normal"
        inputProps={{
          style: {
              color: "white"
          }
      }}
      />

      <StyledTextField
        label="Item Description"
        value={itemDescription}
        onChange={handleItemDescriptionChange}
        multiline
        fullWidth
        required
        margin="normal"
        inputProps={{
          style: {
              color: "white"
          }
      }}
      />

      <StyledFormControl fullWidth required margin="normal">
        <InputLabel style={{ color: '#fff' }}>Category</InputLabel>
        <Select value={category} onChange={handleCategoryChange}  style={{ color: '#fff' }}>
          <MenuItem value='1'>Cars</MenuItem>
          <MenuItem value="4">Real State</MenuItem>
          <MenuItem value="3">Home Accessories</MenuItem>
          <MenuItem value="2">Electronics</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledTextField
        label="Price"
        type="number"
        value={price}
        onChange={handlePriceChange}
        fullWidth
        required
        margin="normal"
        inputProps={{
          style: {
              color: "white"
          }
      }}
      />

      <StyledFormControl fullWidth required margin="normal">
        <InputLabel  style={{ color: '#fff' }}>Currency</InputLabel>
        <Select value={currency} onChange={handleCurrencyChange}  style={{ color: '#fff' }}>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="AMD">AMD</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledTextField
        label="Location"
        value={location}
        onChange={handleLocationChange}
        fullWidth
        required
        margin="normal"
        inputProps={{
          style: {
              color: "white"
          }
      }}
      />

      <SaveButton type="submit" variant="contained" color="primary">
        Add Listing
      </SaveButton>
    </form>
    </ProfileContainer>
    {success && (
      <Alert variant="filled" severity="success" sx={{ mb: "25px", mt: "25px" }}>
        Item added successfully!
      </Alert>
    )}
    </>
  );
};

export default AddItem;
