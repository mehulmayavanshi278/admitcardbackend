const express = require("express");
require("dotenv").config();
const app = express();
const moment = require("moment");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const router = require("./Routes/router");
require("./DB/Conn");
const PORT = process.env.PORT || 5000
// console.log(__dirname);

app.use(express.static(path.join(__dirname,"/images")));
console.log(path.join(__dirname,"/images"));
app.use(cors({
  origin:"https://test-app-565d5.web.app"
}));
app.use(bodyParser.json())
app.use( bodyParser.urlencoded({extended: true }));
app.use(router);




// console.log(moment().format('D-MM-YYYY'));

const start = async ()=>{
    try{
      app.listen(PORT,()=>{
        console.log("App is running on port no 5000");
      })
    }catch(err){
        console.log(err);
    }
}


start();
