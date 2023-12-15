const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  Order: { type: Number, unique: true },
  Date: { type: Date },
  Products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  //FinalPrice: { type: Number }
});

OrderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;