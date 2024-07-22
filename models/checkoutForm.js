const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CheckoutFormSchema = new Schema({
    firstName: { type: String, required: true, maxLength: 20 },
    lastName: { type: String, required: true, maxLength: 20  },
    email: { type: String, required: true, maxLength: 20  },
    phone: { type: String, required: true, maxLength: 20  },
    address: { type: String, required: true, maxLength: 50  },
    deliveryInstructions: { type: String, maxLength: 200  },
    deliveryTime: { type: String, required: true, enum: ['ASAP', 'Scheduled'] },
    paymentMethod: { type: String, required: true, enum: ['Credit Card', 'Cash on Delivery', 'Apple Or Google Pay'] }
});

module.exports = mongoose.model("CheckoutForm", CheckoutFormSchema);