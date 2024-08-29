
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header1">
      <input type="text" placeholder="Type to search" />
      <div className="user-profile1">
        <img src="user-profile-url" alt="User" />
      </div>
    </div>
  );
}

export default Header;
