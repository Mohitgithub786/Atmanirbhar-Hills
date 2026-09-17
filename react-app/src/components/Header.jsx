import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIChatbot from "./AIChatbot";

function Header(props) {
  const [loc, setLoc] = useState(null);
  const [showOver, setshowOver] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const userConfirmed = window.confirm("Do you want to Logout?");
    if (userConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  const locations = [
    { latitude: 28.6139, longitude: 77.209, placeName: "Una, H.P." },
    { latitude: 19.076, longitude: 72.8777, placeName: "Shimla, H.P." },
  ];

  return (
    <div className="header-container d-flex justify-content-between">
      <div className="header d-flex">
        <Link className="links" to="/">
          <div className="logo"></div>
        </Link>

        <select
          style={{ borderRadius: "4px", width: "300px", height: "50px" }}
          value={loc}
          onChange={(e) => {
            localStorage.setItem("userLoc", e.target.value);
            setLoc(e.target.value);
          }}
        >
          {locations.map((item, index) => (
            <option key={index} value={`${item.latitude},${item.longitude}`}>
              {item.placeName}
            </option>
          ))}
        </select>

        <input
          className="search"
          placeholder="Search"
          type="text"
          value={props && props.search}
          onChange={(e) =>
            props.handlesearch && props.handlesearch(e.target.value)
          }
        />
        <button
          className="search-btn"
          onClick={() => props.handleClick && props.handleClick()}
        >
          <FaSearch />
        </button>

        {/* Cart Icon */}
        <div
          className="cart-icon"
          onClick={() => navigate("/cart")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#6C0345",
            width: "50px",
            height: "50px",
            color: "#fff",
            fontSize: "24px",
            borderRadius: "50%",
            marginLeft: "110px",
            cursor: "pointer",
          }}
        >
          <AiOutlineShoppingCart />
        </div>
      </div>

      <div>
        <div
          onClick={() => setshowOver(!showOver)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#6C0345",
            width: "50px",
            height: "50px",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "50%",
          }}
          className="user ri-user-line"
        ></div>

        {showOver && (
          <div
            style={{
              minHeight: "100px",
              width: "200px",
              background: "#eee",
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: 9999,
              marginTop: "50px",
              marginRight: "50px",
              color: "red",
              fontSize: "14px",
              background: "#6C0345",
              borderRadius: "7px",
            }}
          >
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/my-profile">
                  <button className="logout-btn">PROFILE</button>
                </Link>
              )}
            </div>
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/add-product">
                  <button className="logout-btn">ADD PRODUCT</button>
                </Link>
              )}
            </div>
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/liked-products">
                  <button className="logout-btn">FAVOURITES</button>
                </Link>
              )}
            </div>
            <div>
              {!!localStorage.getItem("token") && (
                <Link to="/my-products">
                  <button className="logout-btn">MY ADS</button>
                </Link>
              )}
            </div>
            <div>
              {!localStorage.getItem("token") ? (
                <Link to="/login">
                  <button className="logout-btn">LOGIN</button>
                </Link>
              ) : (
                <button className="logout-btn" onClick={handleLogout}>
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <AIChatbot />
    </div>
  );
}

export default Header;
