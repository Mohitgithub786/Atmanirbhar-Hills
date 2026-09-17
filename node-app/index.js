require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");
const aiController = require("./controllers/aiController");

// Ensure uploads folder exists locally or in environment
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const bodyParser = require("body-parser");
const app = express();
app.use("/uploads", express.static(uploadsDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: "*"
}));

const port = process.env.PORT || 4000;
const mongoose = require("mongoose");

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to mongodb", error);
    });
} else {
  console.warn("WARNING: MONGODB_URI environment variable is not defined!");
}

app.get("/", (req, res) => {
  res.send("Atmanirbhar Hills API Server is Running");
});

app.get("/search", productController.search);
app.post("/like-product", userController.likeProducts);
app.post(
  "/add-product",
  upload.fields([{ name: "pimage" }, { name: "pimage2" }]),
  productController.addProduct
);
app.get("/get-products", productController.getProducts);
app.get("/get-product/:pId", productController.getProductsById);
app.post("/liked-products", userController.likedProducts);
app.post("/my-products", productController.myProducts);
app.post("/signup", userController.signup);
app.get("/my-profile/:userId", userController.myProfileById);
app.get("/get-user/:uId", userController.getUserById);
app.post("/login", userController.login);

// AI Assistant & ML Generation Routes
app.post("/ai-assistant", aiController.askAssistant);
app.post("/ai-generate-description", aiController.generateDescription);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

