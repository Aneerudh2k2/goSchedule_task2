const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  // "mongodb+srv://taskapp:taskapp@cluster0.ojjia.mongodb.net/rate_limit_api?retryWrites=true&w=majority",
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
