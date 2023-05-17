const express = require('express');
const app = express();
const dbconnect = require('./mongoConnect/dbconnect');
const router = require('./routes/routes');
// const path = require("path");
// const Image = require("./models/image");
// const fs = require("fs");
// const mongoose = require('mongoose');


// const Property = require("./models/property")
const port = 6222
// const multer = require('multer');


app.use(express.json());

dbconnect();


// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//       callback(null, 'uploads');
//     },
//     filename: function (req, file, callback) {
//     //   const fileExtension = path.extname(file.originalname);
//       callback(null, file.originalname);
//     }
//   });
  

// const upload = multer({ storage: storage });

// app.post('/image', upload.single('file'), async (req, res) => {
//     if (!req.file) {
//       console.log("No file received");
//       return res.send({ 
//         message: "No file received"
//       });
//     } else {
//       console.log('file received');
  
//       try {
//         const imagenew = new Image({
//           name: req.file.originalname
//         });
  
//         const savedImage = await imagenew.save();
        
//         return res.status(200).json({
//           message: "File received and saved",
//           image: savedImage
//         });
//       } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Error saving image" });
//       }
//     }
//   });
  
// app.get('/image/:imagename', (req, res) => {
//     try{
        
//         const { imagename } = req.params;
//         console.log(imagename);
//         const imagePath = path.join(__dirname, 'uploads', imagename); 
//         if (!fs.existsSync(imagePath)) {
//             return res.status(404).json({ message: "Image not found" });
//           }
//         res.sendFile(imagePath);
//     }
//     catch(E){
//         console.log(E);

//     }

//   });



app.use(router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));



