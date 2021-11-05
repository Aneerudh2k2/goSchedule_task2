const express = require("express");
const app = express();
require("./db/db.config");
require("dotenv").config();
const RateLimit = require("./routes/ratelimit");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(RateLimit);
app.listen(port, () => {
  console.log(`Server listening to the port ${port}`);
});
