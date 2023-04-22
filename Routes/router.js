const express = require("express");
const router = express.Router();
const multer  = require('multer');
const admusers = require("../Schema/admusers");
const {register , login , logout} = require("../controllers/postcontroller");
const {addbasicinfo , updatebasicprofile , updatebesicdata , uploadexperience , updateadditionalinfo , updatelordetails , uploadtestscore} = require("../controllers/putcontroller");
const {getprofileinfo} = require("../controllers/getcontroller")

router.post("/register" , register)
router.post("/login" , login)
router.post("/logout" , logout)

router.get("/getprofileinfo" , getprofileinfo )

router.put("/addbasicinfo" , addbasicinfo)
router.put("/updatebasicprofile" , updatebasicprofile)
router.put("/updatebesicdata" , updatebesicdata)
router.put("/uploadexperience" , uploadexperience)
router.put("/updateadditionalinfo" , updateadditionalinfo)
router.put("/updatelordetails" , updatelordetails)
router.put("/uploadtestscore/:testName" , uploadtestscore)
module.exports = router;