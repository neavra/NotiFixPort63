const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8001;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', (req, res) => {
    return res.send('Hello from Express server!');
});

app.listen(port, () => console.log(`Express.js API listening on port ${port}`));
