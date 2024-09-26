const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const dotenv = require("dotenv");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "20d" });
};

dotenv.config();

const stripe_key = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripe_key);

module.exports = {
  stripe: stripe,
  generateToken,
};
