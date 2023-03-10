require("dotenv").config();
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/route/route_index");
const cors = require("cors");
const port = process.env.PORT || 5000


app.use(cors());
app.use(urlencoded({ extended: true }));

app.use(json());
app.use("/api/v1/", router);

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(port, (req, res) => {
  console.log(`Hiringme Backend Succes Run on Port ${port}` );
});
