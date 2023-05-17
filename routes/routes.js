const express = require("express");
const controller = require("../controllers/controllers")



const router = express.Router();


//for posting property
router.post("/uploadproperty", controller.uploadProperty);
//for getting property
router.get("/getproperty" , controller.getproperty);
//for getting image
router.get("/getImage/:imagename", controller.getImage);
//for signIn
router.post("/SignIn" , controller.signIn);
//for signUp
router.post("/SignUp" , controller.SignUp);
//find prperty by name
router.get("/getpropertybyname/:propertyname" , controller.getpropertybyName);


  
module.exports = router;