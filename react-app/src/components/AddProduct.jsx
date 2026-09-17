import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";
import Footer from "./Footer";

function AddProduct() {
  const navigate = useNavigate();
  const [pname, setpname] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Traditional Craftspeople");
  const [pimage, setpimage] = useState("");
  const [pimage2, setpimage2] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleApi = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const formData = new FormData();
      formData.append("plat", position.coords.latitude);
      formData.append("plong", position.coords.longitude);
      formData.append("pname", pname);
      formData.append("pdesc", pdesc);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("pimage", pimage);
      formData.append("pimage2", pimage2);
      formData.append("userId", localStorage.getItem("userId"));

      const url = API_URL + "/add-product";
      axios
        .post(url, formData)
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
            navigate("/");
          }
        })
        .catch((err) => {
          alert("server err");
        });
    });
  };

  const handleGenerateAIDesc = () => {
    if (!pname) {
      alert("Please enter a Product Name first to generate description.");
      return;
    }
    axios
      .post(`${API_URL}/ai-generate-description`, { pname, category })
      .then((res) => {
        if (res.data?.description) {
          setpdesc(res.data.description);
        }
      })
      .catch((err) => console.error("AI Generation error:", err));
  };

  return (
    <div>
      <Header />
      <div className="p-3">
        <h2 style={{ color: "#6C0345" }}> ADD PRODUCT HERE : </h2>
        <label style={{ color: "#6C0345" }}> Product Name </label>
        <input
          className="form-control"
          type="text"
          value={pname}
          onChange={(e) => {
            setpname(e.target.value);
          }}
        />
        <div className="d-flex justify-content-between align-items-center mt-2">
          <label style={{ color: "#6C0345" }}> Product Description </label>
          <button
            type="button"
            className="btn btn-sm text-white"
            style={{ background: "linear-gradient(135deg, #ff6b6b, #4ecdc4)" }}
            onClick={handleGenerateAIDesc}
          >
            ✨ Auto-Generate with AI
          </button>
        </div>
        <input
          className="form-control"
          type="text"
          value={pdesc}
          onChange={(e) => {
            setpdesc(e.target.value);
          }}
        />
        <label style={{ color: "#6C0345" }}> Product Price</label>
        <input
          className="form-control"
          type="text"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
        <label style={{ color: "#6C0345" }}> Product Category </label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
        >
          {categories &&
            categories.length > 0 &&
            categories.map((item, index) => {
              return <option key={"option" + index}> {item} </option>;
            })}
        </select>
        <label style={{ color: "#6C0345" }}> Product Image </label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => {
            setpimage(e.target.files[0]);
          }}
        />

        <label style={{ color: "#6C0345" }}> Product Second Image </label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => {
            setpimage2(e.target.files[0]);
          }}
        />
        <button
          onClick={handleApi}
          style={{ background: "#6C0345", border: "#6C0345" }}
          className="btn btn-primary mt-3"
        >
          {" "}
          SUBMIT{" "}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default AddProduct;
