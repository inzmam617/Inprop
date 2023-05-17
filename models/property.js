const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  bedrooms: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
  area:{
    type : String,
    required : true
  },
  price :{
    type : String,
    required : true
  },
  location :{
    type : String,
    required : true
  }, 
  imageName: {
    type : String
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
