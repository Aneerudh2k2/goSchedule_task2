const express = require("express");
const router = new express.Router();

const UserLimits = require("../models/ratelimitmodel");

router.post("/signup", async (req, res) => {
  try {
    const { body } = req;
    if (body.plan === "free_plan") {
      body.total_requests = 5;
      body.remaining_request_allowed = 5;
    } else {
      body.total_requests = 10;
      body.remaining_request_allowed = 10;
    }

    const user = new UserLimits(body);

    const validationErrors = user.validateSync();

    if (validationErrors) {
      res.status(400).send({ error: validationErrors.message });
      return;
    }
    console.log(body);
    await user.save();
    res.status(201).send({
      user_id: user._id,
      message: "Store this user id for making future requests",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/mySaasRequest", async (req, res) => {
  try {
    const { userId: _id } = req.query;
    const userRequestData = await UserLimits.findById(_id);
    const { remaining_request_allowed } = userRequestData;

    if (!userRequestData) throw new Error();

    console.log(userRequestData);
    if (remaining_request_allowed === 0) {
      res.status(403).send({ message: "Your plan limit exhausted!!!" });
      return;
    }

    userRequestData.remaining_request_allowed = remaining_request_allowed - 1;
    userRequestData.save();

    res.status(200).send(userRequestData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
