const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User");
const Vendor = require("./models/Vendor");
const Order = require("./models/Order");
const { MedicalModel } = require("./models/medical");
const { MedicineCategoryModel } = require("./models/MedicalCategory");
const { medicinePhotoUpload, medicinePhotoResize } = require("./middleware/Upload/MedicinePhotoUpload");
const cloudinary = require("cloudinary");
const { FeedBackModel } = require("./models/FeedBackModel");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { config } = require("dotenv");
const { generateToken } = require("./middleware/AuthToken/AuthToken");
// auth
const { authMiddleware } = require("./middleware/AuthMiddleware");
//STRIPE
const { stripe } = require("./middleware/AuthToken/AuthToken");
const session = require("express-session");
const app = express();
const cors = require("cors");
const port = 3000;

// middleware start here
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
config({
  path: "./.env",
});
const mongoURI = `mongodb+srv://PHARMANET:pharmanet229@cluster0.jxinmqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

cloudinary.v2.config({
  cloud_name: "deepi3k3h",
  api_key: "581372585943791",
  api_secret: "sOJ-7VSF2E4_Dk2s9QYY5cGwCG0",
});

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
app.use(session({ secret: "this good" }));
app.use(cors());

app.get("/users", (req, res) => {
  User.find()
    .then((records) => res.json({ message: "Users found", data: records }))
    .catch((e) => res.json({ message: "Records not found, due to " + e.message }));
});

app.get("/vendors", (req, res) => {
  Vendor.find()
    .then((records) => res.json({ message: "Vendors found", data: records }))
    .catch((e) => res.json({ messsage: "Records not found, due to " + e.message }));
});

// user login api here

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All Fields are Required");
    }

    const userFound = await User.findOne({ email });
    const isAdmin = userFound?.role === "admin";
    if (isAdmin) {
      return res.status(401).send("No User Found");
    }
    if (userFound && userFound?.password === password) {
      res.json({
        _id: userFound?._id,
        first_name: userFound?.first_name,
        last_name: userFound?.last_name,
        phone: userFound?.phone,
        email: userFound?.email,
        gender: userFound?.gender,
        address: userFound?.address,
        user_type: "customer",
        token: generateToken(userFound?._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Login Credentials");
    }
  } catch (error) {
    res.status(500).send(error?.message);
  }
});

// testing api some here
app.get(`/testing`, authMiddleware, async (req, res) => {
  res.send("hello testing");
});

app.post("/users", async (req, res) => {
  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // If the user does not exist, create a new user
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      phone: req.body.phone,
    });

    await user.save();
    res.json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "User not created, Due to " + error.message });
  }
});

app.post("/vendors", (req, res) => {
  const vendor = new Vendor({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_person_phone: req.body.contact_person_phone,
    contact_person_email: req.body.contact_person_email,
    password: req.body.password,
    contact_person_gender: req.body.contact_person_gender,
    contact_person_address: req.body.contact_person_address,
    vendor_name: req.body.vendor_name,
    business_type: req.body.business_type,
    business_registration_number: req.body.business_registration_number,
    tax_identification_number: req.body.tax_identification_number,
    business_email: req.body.business_email,
    business_phone: req.body.business_phone,
    business_address: req.body.business_address,
    business_city: req.body.business_city,
    website: req.body.website,
  });

  vendor
    .save()
    .then(() => res.json({ message: "Vendor Created" }))
    .catch((e) =>
      res.json({
        message: "Vendor not created, Due to " + e.message,
        error: e.message,
      })
    );
});

app.get("/vendors/:id", (req, res) => {
  Vendor.findById(req.params.id)
    .then((vendor) => {
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    })
    .catch((e) =>
      res.status(500).json({
        message: "Error retrieving vendor with id " + req.params.id,
        error: e.message,
      })
    );
});

app.put("/vendors/:id/verify", (req, res) => {
  Vendor.findByIdAndUpdate(req.params.id, { account_status: "verified" }, { new: true })
    .then((vendor) => {
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    })
    .catch((e) =>
      res.status(500).json({
        message: "Error verifying vendor with id " + req.params.id,
        error: e.message,
      })
    );
});

// vendor login api here

app.post("/vendorlogin", async (req, res) => {
  const { business_email, password } = req.body;
  console.log("it is coming here yoooo");
  console.log(req.body);
  try {
    if (!business_email || !password) {
      res.status(400);
      throw new Error("All Fields are Required");
    }

    const userFound = await Vendor.findOne({ business_email });
    console.log(userFound);
    const isVerified = userFound?.account_status === "verified";
    const isAdmin = userFound?.role === "admin";
    if (isAdmin) {
      return res.status(401).send("No vendor Found");
    }
    console.log(isVerified);

    if (userFound && userFound?.password === password) {
      if (!isVerified) {
        console.log("Ider b araha ha bhai");
        return res.status(401).send("Account not verified Yet By the Admin");
      }
      res.json({
        _id: userFound?._id,
        first_name: userFound?.first_name,
        last_name: userFound?.lastName,
        business_email: userFound?.business_email,
        contact_person_phone: userFound?.contact_person_phone,
        contact_person_email: userFound?.contact_person_email,
        contact_person_gender: userFound?.contact_person_gender,
        contact_person_address: userFound?.contact_person_address,
        vendor_name: userFound?.vendor_name,
        business_type: userFound?.business_type,
        business_registration_number: userFound?.business_registration_number,
        tax_identification_number: userFound?.tax_identification_number,
        business_phone: userFound?.business_phone,
        business_address: userFound?.business_address,
        business_city: userFound?.business_city,
        website: userFound?.website,
        user_type: userFound?.role,
        token: generateToken(userFound?._id),
        isVerified: userFound?.isAccountVerified,
      });
    } else {
      return res.status(401).send("Invalid Login Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//ADMIN LOGIN FROM HERE API END POINT
app.post("/adminLogin", async (req, res) => {
  const { business_email, password } = req.body;
  console.log("it is coming here yoooo");
  console.log(req.body);
  try {
    if (!business_email || !password) {
      res.status(400);
      throw new Error("All Fields are Required");
    }

    const userFound = await Vendor.findOne({ business_email });

    if (!userFound) {
      console.log("Ider b araha ha bhai");
      return res.status(401).send("No Account Found with that Credentials!");
    }

    const isAdmin = userFound?.role === "admin";
    console.log(isAdmin);

    if (!isAdmin) {
      console.log("Ider b araha ha bhai");
      return res.status(401).send("You are not authorized to login from here");
    }
    if (userFound && userFound?.password === password) {
      res.json({
        _id: userFound?._id,
        first_name: userFound?.first_name,
        last_name: userFound?.lastName,
        business_email: userFound?.business_email,
        contact_person_phone: userFound?.contact_person_phone,
        contact_person_email: userFound?.contact_person_email,
        contact_person_gender: userFound?.contact_person_gender,
        contact_person_address: userFound?.contact_person_address,
        vendor_name: userFound?.vendor_name,
        business_type: userFound?.business_type,
        business_registration_number: userFound?.business_registration_number,
        tax_identification_number: userFound?.tax_identification_number,
        business_phone: userFound?.business_phone,
        business_address: userFound?.business_address,
        business_city: userFound?.business_city,
        website: userFound?.website,
        user_type: userFound?.role,
        token: generateToken(userFound?._id),
        isVerified: userFound?.isAccountVerified,
      });
    } else {
      return res.status(401).send("Invalid Login Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Medicine create here
app.post("/medicine", medicinePhotoUpload.single("image"), medicinePhotoResize, async (req, res) => {
  const { medicinename, price, description, category, diseaseType, vendorCity, vendorID, stock } = req.body;
  console.log("req.body;", req.body);
  const localPath = `public/images/medicine/${req.file.filename}`;

  try {
    if (!medicinename || !description || !category) {
      return res.status(400).send("All Fields Required");
    }
    const data = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    let url = data?.secure_url;

    const Medicinedata = MedicalModel({
      medicinename: medicinename,
      image: url,
      description: description,
      price: price,
      category: category,
      diseaseType: diseaseType,
      vendorCity: vendorCity,
      vendorID: vendorID,
      stock: stock,
    });

    await Medicinedata.save();
    res.status(201).json({ message: "Medicine Created", data: Medicinedata });
  } catch (error) {
    res.status(500).send(error);
  }
});

// get recommendations
app.get("/medicines/:diseaseType/:category", async (req, res) => {
  const { diseaseType, category } = req.params;

  try {
    // Find medicines with the specified diseaseType and category
    const medicines = await MedicalModel.find({ diseaseType, category });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all medicine

app.get("/medicine", async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    if (queryObj.medicinename) {
      queryObj.medicinename = { $regex: queryObj.medicinename, $options: "i" };
    }
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = MedicalModel.find(JSON.parse(queryStr));

    // Fetch vendor details for each medicine
    query = query.populate("vendorID", "vendor_name");

    const products = await query;

    // Map each product and add the vendorName
    const productsWithVendorName = await Promise.all(
      products.map(async (product) => {
        const vendor = await Vendor.findById(product.vendorID);
        const vendorName = vendor ? vendor.vendor_name : "Unknown";
        return {
          ...product.toJSON(),
          vendorName,
        };
      })
    );

    res.json(productsWithVendorName);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/medicine/:vendorID", async (req, res) => {
  const { vendorID } = req.params;
  try {
    // Query medicines with the provided vendorID
    const medicines = await MedicalModel.find({ vendorID });

    // Fetch vendor details for each medicine
    const productsWithVendorName = await Promise.all(
      medicines.map(async (medicine) => {
        const vendor = await Vendor.findById(medicine.vendorID);
        const vendorName = vendor ? vendor.vendor_name : "Unknown";
        return {
          ...medicine.toJSON(),
          vendorName,
        };
      })
    );

    res.json(productsWithVendorName);
  } catch (error) {
    res.status(500).send(error);
  }
});

// single medicine
app.get("/medicine/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MedicalModel.findById(id);
    if (!data) {
      return res.status(400).send("Medicine Not Found");
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// single delete
app.delete("/medicine/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MedicalModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).send("Medicine Not Found");
    }

    res.status(200).send("Medicine Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// update medicine
app.put("/medicine/:id", medicinePhotoUpload.single("image"), medicinePhotoResize, async (req, res) => {
  const { id } = req.params;
  const { medicinename, description, price, stock } = req.body;
  // const localPath = `public/images/medicine/${req.file.filename}`;

  try {
    const MedicineUpdate = await MedicalModel.findByIdAndUpdate(
      id,
      {
        medicinename: medicinename,
        description: description,
        price: price,
        stock: stock,
      },
      { new: true }
    );

    res.status(201).json({ message: "Medicine Updated", data: MedicineUpdate });
  } catch (error) {
    res.status(500).send(error);
  }
});

// search medicine
app.get("/medicine/search", async (req, res) => {
  try {
    const queryObj = { ...req.query };
    console.log("searchTerm", queryObj);
    // const searchTerm = req.query.searchTerm;

    // if (!searchTerm) {
    //   return res.status(400).send("Search term is required");
    // }

    // const searchResults = await MedicalModel.find({
    //   medicinename: { $regex: searchTerm, $options: "i" },
    // });

    // console.log("searchResults", searchResults);

    // res.json(searchResults);
  } catch (error) {
    console.log("searchTerm");

    res.status(500).send(error);
  }
});

// create category
app.post("/category", async (req, res) => {
  const { title } = req.body;
  try {
    const data = MedicineCategoryModel({
      title: title,
    });

    await data.save();

    res.status(201).send("Category Created");
  } catch (error) {
    res.status(500).send(error);
  }
});

// all category
app.get("/category", async (req, res) => {
  try {
    const data = await MedicineCategoryModel.find({});

    if (!data) {
      return res.status(400).send("Category Not Found");
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// single category
app.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MedicineCategoryModel.findById(id);

    if (!data) {
      return res.status(400).send("Category Not Found");
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete category
app.delete("/category/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MedicineCategoryModel.findByIdAndDelete(id);

    if (!data) {
      return res.status(400).send("Category Not Found");
    }

    res.status(200).send("Category Deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

// update
app.put("/category/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const data = await MedicineCategoryModel.findByIdAndUpdate(
      id,
      {
        title: title,
      },
      { new: true }
    );

    if (!data) {
      return res.status(400).send("Category Not Found");
    }

    res.status(200).send("Category Updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

// feedback

app.post("/feedback", async (req, res) => {
  console.log("feedback oked 1");

  const { name, email, message, rating, category } = req.body;
  try {
    if (!name && !email && !message) {
      return res.status(400).send("All Fields Required");
    }

    let data = FeedBackModel({
      name: name,
      email: email,
      message: message,
      rating: rating,
      category: category,
    });
    console.log("feedback oked 2", { name, email, message, rating, category });

    await data.save();
    console.log("feedback oked 3");
    res.status(200).send("FeedBack Submited");
  } catch (error) {}
});

// get feedback

app.get("/feedback", async (req, res) => {
  try {
    let data = await FeedBackModel.find({});

    if (!data) {
      return res.status(400).send("Feedback not found");
    }

    res.status(200).send(data);

    res.status(200).send("FeedBack Submited");
  } catch (error) {}
});

// ORDER
// ORDER
app.post("/paymentIntent", async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new errorHandler("Please provide an amount", 400));
  }

  let paymentIntent;

  // Create a new payment intent
  paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    amount: amount * 100,
    currency: "pkr",
    payment_method_types: ["card"],
  });

  return res.status(200).json({
    success: true,
    paymentIntent,
    clientSecret: paymentIntent.client_secret,
  });
});

// app.post("/getPaymentIntent", async (req, res) => {
//   const paymentIntentId = req.session.paymentIntentId;
//   console.log(req.session.paymentIntentId);
//   if (!paymentIntentId) {
//     return res.status(200).json({ error: "No payment intent found" });
//   }

//   const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//   res.json({ clientSecret: paymentIntent.client_secret });
// });
app.post("/order", async (req, res) => {
  const { vendorID, address, postal, total, items, customerID } = req.body;
  console.log(req.body);
  try {
    // Iterate through each item in the order
    for (const item of items) {
      // Get the medicine ID from the item
      const { medicine: med, amount } = item;

      const medicineID = med.id;
      // Find the medicine document in the database
      const medicine = await MedicalModel.findById(medicineID);

      // Check if the medicine exists
      if (!medicine) {
        return res.status(404).json({ message: `Medicine with ID ${medicineID} not found` });
      }
      console.log(medicine.stock, amount);
      // Check if there is enough stock for the order
      if (Number(medicine.stock) < Number(amount)) {
        return res.status(400).json({ message: `Not enough stock for medicine ${medicineID}` });
      }

      // Update the stock of the medicine
      medicine.stock = Number(medicine.stock) - Number(amount);

      // Save the updated medicine document
      await medicine.save();
    }

    // Create the order
    const order = new Order({
      vendorID,
      customerID,
      address,
      postal,
      total,
      items,
    });

    await order.save();

    res.status(201).json({ message: "Order created", data: order });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ creationDate:-1 });
    res.json({ message: "Orders found", data: orders });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get an order by ID
app.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order found", data: order });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update the status of an order by ID
app.put("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status }, // Update only the status field
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", data: updatedOrder });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/orders/:vendorID", async (req, res) => {
  const { vendorID } = req.params;

  try {
    // Aggregate to count orders by status
    const orderCounts = await Order.aggregate([
      { $unwind: "$items" }, // Unwind items array
      { $match: { "items.medicine.vendorID": vendorID } }, // Filter by vendorID
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert orderCounts result to object format
    const countsByStatus = {};
    orderCounts.forEach((count) => {
      countsByStatus[count._id] = count.count;
    });

    // Fetch filtered orders
    const orders = await Order.find();

    // Initialize a map to store orders by orderID
    const orderMap = new Map();

    // Iterate through orders to group medicines by orderID
    for (const order of orders) {
      // Initialize order object if not exists in the map
      if (!orderMap.has(order._id)) {
        orderMap.set(order._id, {
          address: order.address,
          postal: order.postal,
          total: order.total,
          customerID: order.customerID,
          customerName: "Unknown", // Default value
          orderID: order._id,
          status: order.status,
          medicines: [], // Initialize medicines array
        });
      }

      // Fetch the customer details using customerID
      const customer = await User.findById(order.customerID);
      const customerName = customer ? `${customer.first_name} ${customer.last_name}` : "Unknown";

      // Push medicine details into the medicines array of the order
      for (const item of order.items) {
        if (item.medicine.vendorID === vendorID) {
          orderMap.get(order._id).medicines.push({
            medicine: item.medicine,
            amount: item.amount,
          });
        }
      }

      // Update customerName for the order
      orderMap.get(order._id).customerName = customerName;
    }

    // Convert orderMap values to array
    const filteredOrders = Array.from(orderMap.values());

    res.json({ filteredOrders, countsByStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all orders by Customer ID
app.get("/orders/customer/:customerID", async (req, res) => {
  const { customerID } = req.params;
  try {
    const orders = await Order.find({ customerID });
    res.json({ message: "Orders found", data: orders });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete an order by ID
app.delete("/order/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Find the order by its ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted", data: deletedOrder });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
