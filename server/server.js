require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const userRoutes = require("./routes/userRoutes");
const verifyAdmin = require("./middleware/authMiddleware");
const orderRoutes = require("./routes/orderRoutes");

const Car = require("./models/Car");

const app = express();

// =======================
// MIDDLEWARE
// =======================

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(express.static("public"));
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);

// =======================
// CREATE IMAGES FOLDER
// =======================

const uploadFolder = path.join(__dirname, "public/images");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// =======================
// MULTER STORAGE
// =======================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  }

});

const upload = multer({
  storage: storage
});

// =======================
// MONGODB
// =======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  // =======================
// GET ALL CARS
// =======================

app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find().sort({ _id: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// GET SINGLE CAR
// =======================

app.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =======================
// ADD NEW CAR
// =======================

app.post("/cars", verifyAdmin, upload.single("image"), async (req, res) => {
  try {

    const car = new Car({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.file
        ? `/images/${req.file.filename}`
        : "/images/default.jpg",
    });

    const savedCar = await car.save();

    res.status(201).json(savedCar);

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});


// =======================
// UPDATE CAR
// =======================

app.put("/cars/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  try {

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    car.name = req.body.name;
    car.price = req.body.price;
    car.category = req.body.category;

    if (req.file) {

      // Delete old image if it exists
      if (
        car.image &&
        car.image.startsWith("/images/")
      ) {

        const oldImage = path.join(
          __dirname,
          "public",
          car.image
        );

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      car.image = `/images/${req.file.filename}`;
    }

    const updatedCar = await car.save();

    res.json(updatedCar);

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// =======================
// DELETE CAR
// =======================

app.delete("/cars/:id", verifyAdmin, async (req, res) => {
  try {

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    if (
      car.image &&
      car.image.startsWith("/images/")
    ) {

      const imagePath = path.join(
        __dirname,
        "public",
        car.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Car.findByIdAndDelete(req.params.id);

    res.json({
      message: "Car deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
//CAR DETAILS//
app.get("/cars/:id", async(req,res)=>{

try{

const car = await Car.findById(req.params.id);

res.json(car);


}catch(error){

res.status(500).json({
message:error.message
})

}

})



// =======================
// START SERVER
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
})