const bcrypt = require("bcrypt")
const admusers = require("../Schema/admusers");
const jwt = require("jsonwebtoken");
const register=async(req,res)=>{
  try{
    const {name , email , phone , password} = req.body;
    let newadmUser = await new admusers({name , email , phone , password});
    await newadmUser.save();
    return res.send(newadmUser);
  }catch(err){
    console.log(err)
  }

}

const login = async(req,res)=>{
  try{
    const {phone , password} = req.body;
    let loginuser = await admusers.findOne({phone});
    let checkPW = await  bcrypt.compare(password , loginuser.password)
    if(loginuser && checkPW){
      let token = await loginuser.generateAuthToken();
      return res.status(200).send({token:token , message:"login successfully"});
    }else{
      return res.status(400).send("inValid Details");
    }
  }catch(err){
    console.log(err)
  }

}
const logout=async(req,res)=>{
  try{
   const token = req.headers.token;
   let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
   console.log(verifyuser);
   let logoutUser = await admusers.findOne({_id:verifyuser.id});
   logoutUser.tokens = logoutUser.tokens.filter((elm,id)=>{
    return elm==token
   })
   await logoutUser.save();
   return res.status(200).send({data:logoutUser});

  }catch(err){
    console.log(err);
  }
}
module.exports = {register , login , logout}