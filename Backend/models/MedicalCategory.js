const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicineCategory = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
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
)




const MedicineCategoryModel = mongoose.model("MEDICINECATEGORY", MedicineCategory);



module.exports = { MedicineCategoryModel }