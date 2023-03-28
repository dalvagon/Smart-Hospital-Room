const express = require("express");
const cors=require('cors')
const app = express();
const port = 3000;
const { execute } = require("./functions");

app.use(cors())

app.get("/api/data", async (req, res) => {
  let response = await execute();
  console.log(response);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
