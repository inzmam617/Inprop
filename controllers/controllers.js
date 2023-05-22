const Property = require("../models/property");
const User = require("../models/User");

const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

  
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename for the saved file
  }
});

  

const upload = multer({ storage: storage });


const controller = {

async uploadProperty(req, res) {
    try {
      // File upload middleware
      upload.single('image')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during file upload
          console.error(err);
          return res.status(500).json({ message: "Error uploading file" });
        } else if (err) {
          // An unknown error occurred during file upload
          console.error(err);
          return res.status(500).json({ message: "Error uploading file" });
        }
  
        if (!req.file) {
          console.log("No file received");
          return res.send({ message: "No file received" });
        }
  
        // Get property details from request body
        const { name, bathrooms, bedrooms, area, price, location,phone, email,whatsapp} = req.body;
        if(!name , !bathrooms , !bedrooms , !area , !price , !location ,!phone , !email ,!whatsapp ){
          return res.send({message: "Please enter all requied fields"});
        }
  
        // Create new Property instance
        const property = new Property({
          name,
          bathrooms,
          bedrooms,
          area,
          price,
          location,
          phone, 
          email,
          whatsapp,
          imageName: req.file.filename // Save the image name in the imageName field
        });
  
        // Save the property
        await property.save();
  
        return res.status(200).json({ message: "Property uploaded successfully" });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error uploading property" });
    }
},

async getproperty(req ,res) {
    try{
        const property = await Property.find();
        if(property.length == 0){
            res.status(404).json({message : "There are no properties Sotered yet"});
        }     
        
        res.status(200).json(property);
        
    }
    catch(E){
        console.log(E);
    }



},



 getImage(req,res) {
  try{
    const { imagename } = req.params;
    console.log(imagename);
    const imagePath = path.join(__dirname, '../uploads', imagename); 
    if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: "Image not found" });
      }
    res.sendFile(imagePath);

  }
  catch(e){
    console.log(e);
  }
},



async signIn(req, res) {

      try {
        const { email, password } = req.body;
        if(!email ,!password){
          return res.status(200).json({message : "Please enter all requied fields"});
        }
    
        const user = await User.findOne({ email });
        // console.log(user);
    
        if (!user) {
          return res.status(401).send('Invalid email or password');
        }
        if (!user._id) {
          return res.status(401).send('User Already logged In');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).send('Invalid email or password');
        }
    
        const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    
        res.json({ token, email, password, userId: user._id });
    
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
},



async SignUp(req, res){
      try {
        const { name, email, password , country, city} = req.body;
        if(!name , !email , !password , !country , !city){
          return res.status(200).json({message : "Missing required fields"});
        }
        // Check if user already exists with provided email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists with this email' });
        }     
        
     
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({
          name,
          email,
          country,
          city,
          password: hashedPassword,
        });
    
        await user.save();
    
        const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    
        res.json({ token, userId: user._id });

      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
},
 
async getpropertybyName (req, res){
  try{
    const {propertyname} = req.params;

  const property = await Property.find({name : propertyname});
  if(property.length == 0){
    return res.status(200).json({message : "No Property Found By That Name"});
  }
  return res.status(200).json({property});

  }
  catch(e){
    console.log(e);
    return res.status(500).json({message : e});
  }
  


}


}


module.exports = controller;