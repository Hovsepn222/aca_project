import React, { useState, useEffect } from "react";
import "./Header.css";
import SideNavigation from "../sidenav";
import { ImSearch } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { apiUrl, POST } from "../../apiConfig";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import getToken, { setToken, removeToken } from "../useToken";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserLoggedStatus, GetLoggedUserData } from "../loggedInStatus";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const NavbarHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  position: absolute;
  left: 4%;
`;



export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = () => {
    const url = `/search/${searchQuery}`;
    navigate(url);
    setSearchQuery("");
  };

  // Get user status
  useEffect(() => {
    const GetUserData = async () => {
      const userData = await GetLoggedUserData();
      setUserData(userData)
    }
    GetUserData();
  }, [anchorEl]);

  const navigateToHome = () => {
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAddListing = () => {
    navigate('/add')
  };

  const handleMyListings = () => {
    navigate("/mylistings");
    handleMenuClose();
  };
  const handleLogin = () => {
    navigate("/login");
    handleMenuClose();
  };
  const handleLogout = () => {
    navigate('/logout')
  }
  const handleSignup = () => {
    navigate("/signup");
    handleMenuClose();
  };

  const handleFavorites = () => {
    navigate("/favorites");
    handleMenuClose();
  }

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  }

  return (
    <header className="header">
      <div className="sidenav-div">
        <SideNavigation />
      </div>
      <div className="navbar-div">
        <div className="navbar-home" href="/">
          <NavbarHome onClick={navigateToHome}>Home</NavbarHome>
        </div>
      </div>
      <div className="searchBar-div">
        <input
          type="text"
          placeholder="Search"
          className="searchBar-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="searchBar-btn" onClick={handleSearch}>
          {<ImSearch color="white" className="search-btn" />}
        </button>
      </div>

      
        {UserLoggedStatus() && (
          <>
          <div className="user-div">
          <CgProfile className="user-icon" onClick={handleMenuOpen} />
          <Box >
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 12,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
              width: '220px',
              // backgroundColor: "silver",
            }}}      
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfileClick}><ListItemIcon>
            <AccountCircleIcon fontSize="small"/>
          </ListItemIcon>{userData['name']}</MenuItem>
          
          <MenuItem onClick={handleAddListing}><ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>Add Listings</MenuItem>

          <MenuItem onClick={handleMyListings}><ListItemIcon>
            <ClearAllIcon  fontSize="small"/>
            </ListItemIcon>My Listings</MenuItem>

          <MenuItem onClick={handleFavorites}><ListItemIcon>
            <StarBorderIcon fontSize="small" />
          </ListItemIcon> Favorites</MenuItem>

          {/* <MenuItem onClick={handleFavorites}><ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>Settings</MenuItem> */}

          <MenuItem onClick={handleLogout}><ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>Logout</MenuItem>
        </Menu>
        </Box>
        </div>
        </>
        )}

        {!UserLoggedStatus() && (
          <div>
          <Button 
          variant="outlined" 
          color="success"
          onClick={handleLogin}
          sx={{
            fontSize: '1.0rem',
            borderWidth: '1.5px',
            borderColor: '#86c232',
            color: '#86c232',
            mr: '7px',
            '&:hover': {
              backgroundColor: '#86c232',
              color: '#ffffff',
            },
          }}>
            Login
          </Button>
          <Button 
          variant="outlined" 
          color="success"
          onClick={handleSignup}
          sx={{
            fontSize: '1.0rem',
            borderWidth: '1.5px',
            borderColor: '#86c232',
            color: '#86c232',
            mr: '5px',
            '&:hover': {
              backgroundColor: '#86c232',
              color: '#ffffff',
            },
          }}>
            Signup
          </Button>
        </div>
        )}
    </header>
  );
}



// const newRet = () => {
//   return (
//     <Tooltip title="Account settings">
//     <IconButton
//       onClick={handleMenuOpen}
//       size="small"
//       sx={{ ml: 2 }}
//       aria-controls={open ? 'account-menu' : undefined}
//       aria-haspopup="true"
//       aria-expanded={open ? 'true' : undefined}
//     >
//       <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
//     </IconButton>
//   </Tooltip>
//   )
// }