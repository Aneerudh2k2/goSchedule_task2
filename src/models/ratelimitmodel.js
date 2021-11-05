const mongoose = require("mongoose");

const plans = ["free_plan", "paid_plan"];

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!/\S+@\S+\.\S+/.test(value)) {
        throw new Error("Invalid Email Id!!!");
      }
    },
  },
  plan: {
    type: String,
    enum: plans,
    default: "free_plan",
  },
  total_requests: {
    type: Number,
  },
  remaining_request_allowed: Number,
});

const UserLimits = mongoose.model("userlimits", schema);

module.exports = UserLimits;
