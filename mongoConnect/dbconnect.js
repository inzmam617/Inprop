const mongoose =  require("mongoose");
const express = require("express");
const app = express();

 
const dbconnect =  async function connect(){
    try {
      await mongoose.connect('mongodb+srv://inzmam56:inzmam56@cluster0.lprxxnp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB!');
    } catch (err) {
      console.error(err);
    }
    
app.get('/', (req, res) => res.send('Hello World!'))
  }

  module.exports = dbconnect;