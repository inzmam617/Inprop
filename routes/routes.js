const express = require("express");
const controller = require("../controllers/controllers")



const router = express.Router();


//for posting property
router.post("/uploadproperty", controller.uploadProperty);
//for getting property
router.get("/getproperty" , controller.getproperty);
//for getting image
router.get("/getImage/:imagename", controller.getImage);



module.exports = router;