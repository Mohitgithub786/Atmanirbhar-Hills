import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch, FaUser, FaHeart, FaPlusCircle, FaBoxes, FaSignOutAlt, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIChatbot from "./AIChatbot";

function Header(props) {
  const [loc, setLoc] = useState(null);
  const [showOver, setshowOver] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const userConfirmed = window.confirm("Do you want to Logout?");
    if (userConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setshowOver(false);
      navigate("/login");
    }
  };

  const locations = [
    { latitude: 28.6139, longitude: 77.209, placeName: "Una, H.P." },
    { latitude: 19.076, longitude: 72.8777, placeName: "Shimla, H.P." },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setshowOver(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="header-container-modern">
      <div className="header-inner">
        {/* Logo */}
        <Link className="logo-link" to="/">
          <div className="logo-modern"></div>
        </Link>

        {/* Location Selector */}
        <div className="location-select-wrapper">
          <select
            className="location-select"
            value={loc || ""}
            onChange={(e) => {
              localStorage.setItem("userLoc", e.target.value);
              setLoc(e.target.value);
            }}
          >
            {locations.map((item, index) => (
              <option key={index} value={`${item.latitude},${item.longitude}`}>
                📍 {item.placeName}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <input
            className="search-input"
            placeholder="Search hill handicrafts, organic teas, spices..."
            type="text"
            value={(props && props.search) || ""}
            onChange={(e) =>
              props.handlesearch && props.handlesearch(e.target.value)
            }
          />
          <button
            className="search-submit-btn"
            onClick={() => props.handleClick && props.handleClick()}
            title="Search"
          >
            <FaSearch />
          </button>
        </div>

        {/* Actions (Cart + Profile Dropdown) */}
        <div className="header-actions" ref={dropdownRef}>
          {/* Cart Button */}
          <button
            className="header-action-btn cart-btn"
            onClick={() => navigate("/cart")}
            title="Shopping Cart"
          >
            <AiOutlineShoppingCart className="action-icon" />
          </button>

          {/* Profile Dropdown Toggle */}
          <button
            className={`header-action-btn profile-btn ${showOver ? "active" : ""}`}
            onClick={() => setshowOver(!showOver)}
            title="User Menu"
          >
            <FaUser className="action-icon" />
          </button>

          {/* Modern Dropdown Menu */}
          {showOver && (
            <div className="profile-dropdown-menu">
              <div className="dropdown-header">
                <span className="user-status-badge">
                  {isLoggedIn ? "Logged In" : "Welcome Guest"}
                </span>
              </div>

              <ul className="dropdown-items">
                {isLoggedIn && (
                  <>
                    <li>
                      <Link to="/my-profile" onClick={() => setshowOver(false)}>
                        <FaUserCircle className="dropdown-icon" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/add-product" onClick={() => setshowOver(false)}>
                        <FaPlusCircle className="dropdown-icon" /> Add Product
                      </Link>
                    </li>
                    <li>
                      <Link to="/liked-products" onClick={() => setshowOver(false)}>
                        <FaHeart className="dropdown-icon" /> Favourites
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-products" onClick={() => setshowOver(false)}>
                        <FaBoxes className="dropdown-icon" /> My Ads
                      </Link>
                    </li>
                  </>
                )}

                <li className="dropdown-divider"></li>

                <li>
                  {!isLoggedIn ? (
                    <Link to="/login" className="login-link" onClick={() => setshowOver(false)}>
                      <FaSignInAlt className="dropdown-icon" /> Login / Signup
                    </Link>
                  ) : (
                    <button className="logout-menu-item" onClick={handleLogout}>
                      <FaSignOutAlt className="dropdown-icon" /> Logout
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
      <AIChatbot />
    </header>
  );
}

export default Header;
