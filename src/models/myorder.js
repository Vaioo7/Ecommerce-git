const mongoose = require('mongoose');

const MyorderSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true    
  },
  product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'product',
    required : true
  },
  name : {
    type : String,
  },
  size : {
    type : String,
    required : true
  },
  color : {
    type : String,
    required : true
  },
  quantity : {
    type : Number,
    required : true
  },
  totalprice : {
    type : Number
  },
  status: { type: String, default: 'Pending' },
  total : {
    type : Number,
  },
  country : {
    type : String,
  },
  state : {
    type : String,
  },
  postcode : {
    type : Number,
  }
});

const Myorder = mongoose.model('order', MyorderSchema);

module.exports = Myorder;

