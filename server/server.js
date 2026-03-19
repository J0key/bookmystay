const express = require('express');
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config();
const authRoutes = require("./routes/auth")

const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Api is running...");
});

app.use("/api/auth", authRoutes)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
