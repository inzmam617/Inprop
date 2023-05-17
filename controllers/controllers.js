const Property = require("../models/property")
const path = require("path");
const fs = require("fs");


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
        const { name, bathrooms, bedrooms, area, price, location } = req.body;
        if(!name , !bathrooms , !bedrooms , !area , !price , !location){
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
async getImage(req,res) {
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
}


}


module.exports = controller;