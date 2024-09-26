const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicalSchema = new Schema(
  {
    medicinename: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    diseaseType: {
      type: String,
      enum: ["Respiratory", "Digestive", "Cardiovascular", "Neurological"], // Add the types you want
      default: null,
    },
    vendorCity: {
      type: String,
      required: true,
    },
    vendorID: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const MedicalModel = mongoose.model("MEDICAL", MedicalSchema);

module.exports = { MedicalModel };
