const { body, validationResult } = require("express-validator");
const CheckoutForm = require("../models/checkoutForm");
const asyncHandler = require("express-async-handler");

exports.createCheckoutForm = [
  body("firstName", "First name cannot be blank")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body("lastName", "Last name cannot be blank")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body("email", "Email cannot be blank")
    .trim()
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 50 }),
  body("phone", "Phone cannot be blank")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 20 })
    .escape(),
  body("address", "Address cannot be blank")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 50 })
    .escape(),
  body("deliveryInstructions").trim().isLength({ max: 200 }).escape(),
  body("deliveryTime", "Invalid delivery time")
    .trim()
    .isIn(["ASAP", "Scheduled"])
    .escape(),
  body("paymentMethod", "Invalid payment method")
    .trim()
    .isIn(["Credit Card", "Cash on Delivery", "Apple Or Google Pay"])
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const checkoutForm = new CheckoutForm({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      deliveryInstructions: req.body.deliveryInstructions,
      deliveryTime: req.body.deliveryTime,
      paymentMethod: req.body.paymentMethod,
    });

    if (!errors.isEmpty()) {
      console.error("Validation errors:", errors.array());
      return res.status(400).json({
        errors: errors.array(),
        form: checkoutForm,
      });
    }

    try {
      const savedForm = await checkoutForm.save();
      console.log("Checkout form saved:", savedForm);
      res.status(201).json(savedForm);
    } catch (err) {
      console.error("Error saving checkout form:", err);
      res.status(500).json({
        error: "Internal Server Error",
        details: err.message,
      });
    }
  }),
];
