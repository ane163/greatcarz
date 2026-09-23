const express = require("express");
const Order = require("../models/Order");

const router = express.Router();


// CREATE ORDER
router.post("/", async (req, res) => {
  try {

    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch(err){

    res.status(500).json({
      message: err.message
    });

  }
});


// GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {

  try {

    const orders = await Order
      .find()
      .sort({ createdAt: -1 });


    res.json(orders);


  } catch(err){

    res.status(500).json({
      message: err.message
    });

  }

});

// UPDATE ORDER STATUS
router.put("/:id", async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
})

module.exports = router;