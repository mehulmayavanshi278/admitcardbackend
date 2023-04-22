const admusers = require("../Schema/admusers");
const jwt = require("jsonwebtoken");

const getprofileinfo=async(req,res)=>{
    try{
        const token = req.headers.token;
        let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
        console.log(verifyuser);
        let loginuser = await admusers.findOne({_id:verifyuser.id})
        if(loginuser){
            return res.status(200).send({data:loginuser});
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {getprofileinfo}