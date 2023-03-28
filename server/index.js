const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { execute, getAllTemperatures, getAllHumidity } = require("./functions");

app.use(cors());

app.get("/api/data", async (req, res) => {
  let response = await execute()
  console.log(response);
  res.send(response);
});

app.get("/api/gettemp", async (req, res) => {
  const response = await getAllTemperatures()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((response) => {
      console.log("error");
      res.send("eroare");
    });
});

app.get("/api/gethum", async (req, res) => {
  const response = await getAllHumidity()
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((response) => {
      console.log("error");
      res.send("eroare");
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
