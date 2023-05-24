import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import { UserLoggedStatus } from './loggedInStatus';

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
    color: #86c232;
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
      color: #86c232;
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

  const handleSave = () => {
    // Handle save functionality here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
  };

  if (!UserLoggedStatus()) {
    return (
      <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>You're Not Logged In, Log In To View Profile Page</Typography>
  )}
  return (
    <ProfileContainer>
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