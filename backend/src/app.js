const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/travelRoutes");

app.use(cors());
app.use(express.json());

app.use("/", routes);

module.exports = app;