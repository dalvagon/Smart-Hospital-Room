const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { getLatest, getTemperatureHistory, getHumidityHistory } = require("./functions");

app.use(cors());

app.get("/api/latests", async (req, res) => {
  let response = await getLatest()
  res.send(response);
});

app.get("/api/temperature/history", async (req, res) => {
  const response = await getTemperatureHistory()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/humidity/history", async (req, res) => {
  const response = await getHumidityHistory()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
