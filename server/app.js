require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoute = require("./routes/stripePayment");

const app = express();

// DB CONNECTION ------------
mongoose
  .connect(
    `${process.env.MONGODB_URI}` || "mongodb://localhost:27017/tshirtshop",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((err) => console.log(err.message));

// MIDDLEWARE -------------
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTES ----------
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoute);

app.get("/", (req, res) => res.send("Working!!!"));
// STARTING A SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is running at ${port}`));
