// connect database

const express = require('express');
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config();
const authRoutes = require("./routes/auth")
const profileRoutes = require("./routes/profile")
const listingRoutes = require("./routes/listings")
const bookingRoutes = require("./routes/booking")

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Api is running...");
});

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/listings", listingRoutes)
app.use("/api/bookings", bookingRoutes)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
