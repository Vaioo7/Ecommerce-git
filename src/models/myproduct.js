const mongoose = require('mongoose');

const MyproductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category : {
    type: String,
    required: true
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      // default: "public_id",
    },
    url: {
      type: String,
      required: true,
      // default: "url",

    },
  },
});

const Myproduct = mongoose.model('product', MyproductSchema);

module.exports = Myproduct;

