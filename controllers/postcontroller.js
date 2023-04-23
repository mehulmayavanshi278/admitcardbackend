const bcrypt = require("bcrypt")
const admusers = require("../Schema/admusers");
const jwt = require("jsonwebtoken");
const profilePic = require("../Schema/profilepicSchema")
const register=async(req,res)=>{
  try{
    const {name , email , phone , password} = req.body;
    let isregistered = await admusers.findOne({phone});
    console.log(isregistered);
  
    if(isregistered){
      return res.status(201).send({message:"this phone number already sign in"});
    }else{
      let profilePics = await profilePic.find({});
      // console.log(profilePics);
      let userImg 
      profilePics[0].images.map((elm,id)=>{
         if(elm.imgProfile.charAt(0)===name.charAt(0)){
          userImg=elm.imgProfile;
         }
      });
      let newadmUser = await new admusers({name , email , phone , password , userImg});
      await newadmUser.save();
      return res.send(newadmUser);
    }

  }catch(err){
    console.log(err)
  }

}

const login = async(req,res)=>{
  try{
    const {phone , password} = req.body;
    let loginuser = await admusers.findOne({phone});
    if(loginuser){
      let checkPW = await  bcrypt.compare(password , loginuser.password)
      if(loginuser && checkPW){
        let token = await loginuser.generateAuthToken();
        return res.status(200).send({token:token , message:"login successfully"});
      }else{
        return res.status(201).send({message:"invalidd login details"});
      }
    }else{
      return res.status(201).send({message:"user not signed in"});
    }

  }catch(err){
    return res.send(err);
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