require("dotenv").config();
const mongoose = require("mongoose");

const Car = require("./models/Car");
const products = require("./produ");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Delete existing cars
    await Car.deleteMany();

    // Remove the id field because MongoDB creates _id automatically
    const cars = products.map(({ id, ...rest }) => rest);

    // Insert all cars
    await Car.insertMany(cars);

    console.log("All cars imported successfully!");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })