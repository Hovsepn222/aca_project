import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import { UserLoggedStatus } from './loggedInStatus';
import { apiUrl } from '../apiConfig';
import getToken from './useToken';
import axios from 'axios';

// Styled components
const ProfileContainer = styled.div`
  padding: 20px;
  margin-left: 250px;
  margin-right: 250px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
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



const SaveButton = styled(Button)`
  margin-top: 50px;
  background-color: #86c232 !important;
  color: white !important;

  &:hover {
    background-color: #86c232 !important;
    opacity: 0.9;
  }
`;

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/loggeddata`,  {
          method: "POST",
          mode: 'cors',
          headers: {
            Authorization: 'Bearer ' + getToken()
          }});
        const jsonData = await res.json();
        setName(jsonData['name'])
        setEmail(jsonData['email'])
        setPhoneNumber(jsonData['phone_number'])
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [])

  const handleSave = async () => {
    const userData = {
      "name": name,
      "email": email,
      "phone_number": phoneNumber
    };

    try {
      const res = await axios.post(`${apiUrl}/changeloggeddata`, userData, {
        headers: {
          "Authorization" : `Bearer ${getToken()}`
        }
      });
      // const jsonData = await res.json();
      // setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!UserLoggedStatus()) {
    return (
      <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>You're Not Logged In, Log In To View Profile Page</Typography>
  )}

  return (
    <ProfileContainer style={{marginTop: '50px', marginBottom: '100px'}}>
      <Title variant="h4" gutterBottom style={{color: "#86c232"}}>
        User Profile
      </Title>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledTextField color='success'
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <StyledTextField color='success'
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledTextField color='success'
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            inputProps={{ style: { color: 'white' } }}
          />
        </Grid>

        <Grid item xs={12}>
          <SaveButton variant="contained" onClick={handleSave}>
            Save
          </SaveButton>
        </Grid>

      </Grid>
    </ProfileContainer>
  );
};

export default UserProfile;