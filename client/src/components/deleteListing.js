import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import getToken from './useToken'
import { apiUrl } from '../apiConfig';
import { useNavigate } from 'react-router-dom';


const DeleteListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (itemId) => {
        try {
            const res = await fetch(`${apiUrl}/delete/${itemId}`, {
                method: "POST",
                mode: 'cors',
                headers: {
                Authorization: 'Bearer ' + getToken()
                }});
            const jsonData = await res.json();
            console.log(jsonData);
            if (jsonData['message'] == "Item deleted successfully") {
                navigate('/mylistings');
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        };
      };

      const handleClose = () => {
        // Perform the back operation
      };
  return (
    <>
      <Typography variant="h4" sx={{ color: "white", textAlign: "center", mb: "50px", mt: "50px" }}>Confirm Delete?</Typography>
      <DialogActions>
      <Button onClick={() => handleDelete(id)}  sx={{color: "white", textAlign: "center", display: "block", mb: "50px", mt: "50px", mx: "auto"}}>
          Delete
        </Button>
        <Button onClick={handleClose} sx={{color: "white", textAlign: "center", display: "block", mb: "50px", mt: "50px", mx: "auto"}}>
          Cancel
        </Button>
      </DialogActions>
      </>
  );
}
export default DeleteListing
