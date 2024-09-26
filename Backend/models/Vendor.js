const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  contact_person_phone: {
    type: String,
    required: true,
  },
  contact_person_email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact_person_gender: {
    type: String,
    required: true,
  },
  contact_person_address: {
    type: String,
    required: true,
  },
  createdAt: {
    default: () => Date.now(),
    type: Date,
  },
  vendor_name: {
    type: String,
    required: true,
  },
  business_type: {
    type: String,
    required: true,
  },
  business_registration_number: {
    type: String,
    unique: true,
    required: true,
  },
  tax_identification_number: {
    type: String,
    unique: true,
    required: true,
  },
  business_email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "vendor",
  },
  business_phone: {
    type: String,
    unique: true,
    required: true,
  },
  business_address: {
    type: String,
    required: true,
  },
  business_city: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  account_status: {
    type: String,
    default: "pending",
  },
});

module.exports = new mongoose.model("Vendor", vendorSchema);
