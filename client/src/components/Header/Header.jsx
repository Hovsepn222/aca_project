import React, { useState } from "react";
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
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = () => {
    const url = `/search/${searchQuery}`;
    navigate(url);
    setSearchQuery("");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyListings = () => {
    navigate("/mylistings");
    handleMenuClose();
  };
  const handleLogin = () => {
    navigate("/login");
    handleMenuClose();
  };
  const handleSignup = () => {
    navigate("/signup");
    handleMenuClose();
  };

  const handleFavorites = () => {
    navigate("/favorites");
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
      <div className="add-div">
        {<MdOutlineAddToPhotos className="add-icon" />}
      </div>
      <div className="user-div">
        <CgProfile className="user-icon" onClick={handleMenuOpen} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMyListings}>My Listings</MenuItem>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={handleSignup}>SignUp</MenuItem>
          <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
