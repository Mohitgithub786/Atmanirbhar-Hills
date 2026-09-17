import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./Home.css";
import API_URL from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "./Slider";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [issearch, setissearch] = useState(false);

  useEffect(() => {
    const url = API_URL + "/get-products";
    axios
      .get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        toast.error("Server Err.");
      });
  }, []);

  const handlesearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    const url =
      API_URL +
      "/search?search=" +
      search +
      "&loc=" +
      localStorage.getItem("userLoc");
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.products);
        setcproducts(res.data.products);
        setissearch(true);
      })
      .catch((err) => {
        toast.error("Server Err", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem("userId");

    if (!userId) {
      toast.info("Please Login first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const url = API_URL + "/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          toast.success("Liked", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("Server Err", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div>
      <Header
        search={search}
        handlesearch={handlesearch}
        handleClick={handleClick}
      />

      <Categories handleCategory={handleCategory} />

      <Slider />
      {issearch && cproducts && (
        <h5 style={{ color: "#6C0345" }}>
          {" "}
          SEARCH RESULTS
          <button className="clear-btn" onClick={() => setissearch(false)}>
            {" "}
            CLEAR{" "}
          </button>
        </h5>
      )}

      {issearch && cproducts && cproducts.length == 0 && (
        <h5> No Results Found </h5>
      )}
      {issearch && (
        <div className="d-flex justify-content-center flex-wrap">
          {cproducts &&
            products.length > 0 &&
            cproducts.map((item, index) => {
              return (
                <div key={item._id} className="card m-3">
                  <div
                    onClick={() => handleLike(item._id)}
                    className="icon-con"
                  >
                    <FaHeart className="icons" />
                  </div>
                  <img
                    width="300px"
                    height="200px"
                    src={API_URL + "/" + item.pimage}
                    alt={item.pname}
                  />

                  <p className="m-2"> {item.pname} </p>
                  <p className="m-2">{item.category} </p>
                  <h3 className="m-2 text-danger"> {item.price} </h3>
                  <p className="m-2 text-success"> {item.pdesc} </p>
                </div>
              );
            })}
        </div>
      )}

      {!issearch && (
        <div className="d-flex">
          <div className="d-flex justify-content-center flex-wrap">
            {products &&
              products.length > 0 &&
              products.map((item, index) => {
                return (
                  <div
                    onClick={() => handleProduct(item._id)}
                    key={item._id}
                    className="card m-3"
                  >
                    <div
                      onClick={(e) => handleLike(item._id, e)}
                      className="icon-con"
                    >
                      <FaHeart className="icons" />
                    </div>
                    <img
                      width="250px"
                      height="150px"
                      src={API_URL + "/" + item.pimage}
                    />
                    <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                    <p className="m-2"> {item.pname} </p>
                    <p className="m-2">{item.category} </p>
                    <p className="m-2 text-success"> {item.pdesc} </p>
                  </div>
                );
              })}
          </div>

          {/* Modern News & Industry Updates Section */}
          <div className="news-section-wrapper">
            <div className="news-section-header">
              <div>
                <h3 className="news-title">📰 Latest Atmanirbhar & Economic Updates</h3>
                <p className="news-subtitle">Stay informed about local industry, handicraft initiatives & economic growth</p>
              </div>
            </div>

            <div className="news-grid">
              <a
                href="https://economictimes.indiatimes.com/news/india/atmanirbhar-bharat-campaign-becoming-a-mass-movement-pm-modi-in-mann-ki-baat/articleshow/114650147.cms"
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <div className="news-card-top">
                  <span className="news-tag">Mass Movement</span>
                  <span className="news-source">Economic Times</span>
                </div>
                <h4 className="news-card-headline">
                  Atmanirbhar Bharat campaign becoming a mass movement: PM Modi in 'Mann Ki Baat'
                </h4>
                <div className="news-card-footer">
                  <span>Read Full Coverage</span>
                  <span className="news-arrow">→</span>
                </div>
              </a>

              <a
                href="https://economictimes.indiatimes.com/news/india/ayodhya-ram-temple-not-to-use-chinese-diwali-decorative-items-trust/articleshow/114737014.cms"
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <div className="news-card-top">
                  <span className="news-tag">Local Crafts</span>
                  <span className="news-source">Economic Times</span>
                </div>
                <h4 className="news-card-headline">
                  Ayodhya Ram Temple not to use Chinese Diwali decorative items: Trust
                </h4>
                <div className="news-card-footer">
                  <span>Read Full Coverage</span>
                  <span className="news-arrow">→</span>
                </div>
              </a>

              <a
                href="https://economictimes.indiatimes.com/news/defence/to-save-flying-hours-iaf-inaugurates-c-295-simulator-to-train-pilots/articleshow/115226762.cms"
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <div className="news-card-top">
                  <span className="news-tag">Defence & Tech</span>
                  <span className="news-source">Economic Times</span>
                </div>
                <h4 className="news-card-headline">
                  To save flying hours, IAF inaugurates C-295 simulator to train pilots
                </h4>
                <div className="news-card-footer">
                  <span>Read Full Coverage</span>
                  <span className="news-arrow">→</span>
                </div>
              </a>

              <a
                href="https://economictimes.indiatimes.com/news/defence/govt-starts-process-of-procuring-surveillance-helicopters-with-accessories/articleshow/115219168.cms"
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <div className="news-card-top">
                  <span className="news-tag">Procurement</span>
                  <span className="news-source">Economic Times</span>
                </div>
                <h4 className="news-card-headline">
                  Govt starts process of procuring surveillance helicopters with accessories
                </h4>
                <div className="news-card-footer">
                  <span>Read Full Coverage</span>
                  <span className="news-arrow">→</span>
                </div>
              </a>

              <a
                href="https://economictimes.indiatimes.com/news/india/use-vedic-wisdom-to-do-better-with-lesser-resourcesnavi-radjou/articleshow/115310383.cms"
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <div className="news-card-top">
                  <span className="news-tag">Innovation</span>
                  <span className="news-source">Economic Times</span>
                </div>
                <h4 className="news-card-headline">
                  Use Vedic wisdom to do better with lesser resources: Navi Radjou
                </h4>
                <div className="news-card-footer">
                  <span>Read Full Coverage</span>
                  <span className="news-arrow">→</span>
                </div>
              </a>

              <a
                href="https://economictimes.indiatimes.com/news/economy/foreign-trade/consider-two-annual-editions-of-international-trade-fair-piyush-goyal-tells-itpo/articleshow/115303381.cms"
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <div className="news-card-top">
                  <span className="news-tag">Trade Fair</span>
                  <span className="news-source">Economic Times</span>
                </div>
                <h4 className="news-card-headline">
                  Consider two annual editions of international trade fair: Piyush Goyal tells ITPO
                </h4>
                <div className="news-card-footer">
                  <span>Read Full Coverage</span>
                  <span className="news-arrow">→</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Home;
