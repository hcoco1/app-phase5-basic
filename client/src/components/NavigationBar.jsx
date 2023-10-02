import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/signout');
  }


  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
          
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link to="/" className="nav-link">
                  <FaHome /> Home
                </Link>
              </li>

              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link to="/signin" className="nav-link">
                  <FaSignInAlt /> Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  <FaSignOutAlt /> Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  <FaSignOutAlt /> People
                </Link>
              </li>

              <li className="nav-item">
              <button onClick={handleSignOut}>Sign Out</button>
              </li>

        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
