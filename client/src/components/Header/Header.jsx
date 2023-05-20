import React, {useState} from "react";
import "./Header.css";
import SideNavigation from '../sidenav'
import { GoSearch } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { apiUrl, POST } from "../../apiConfig";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const url = `/search/${searchQuery}`;
    navigate(url);
    console.log(data);
    setSearchQuery('');
  };

  return (
    <header className="header">
      <div className='sidenav-div'>
      <SideNavigation/>
      </div>
      <div className="navbar-div">
        <div className="navbar-home">Home</div>
      </div>
      <div className="searchBar-div">
        <input
          type="text"
          placeholder="Search..."
          className="searchBar-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="searchBar-btn" onClick={handleSearch}>
          {<GoSearch className="search-btn" />}
        </button>
      </div>
      <div className="lang-div">{<MdLanguage className="lang-icon" />}</div>
      <div className="cart-div">
        {<RiShoppingCartLine className="cart-icon" />}
      </div>
      <div className="user-div">{<FaUserCircle className="user-icon" />}</div>
    </header>
  );
}
