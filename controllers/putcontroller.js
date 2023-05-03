const admusers = require("../Schema/admusers");
const jwt = require("jsonwebtoken");

const addbasicinfo=async(req,res)=>{
  try{
    const token = req.headers.token;
    console.log(token);
    let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
    console.log(verifyuser);
    let loginuser = await admusers.findOne({_id:verifyuser.id})
    let {objective , countrypreference , courselevel , startcollage , preferedcourse , specializationn} = req.body;
    let info = {objective , countrypreference , courselevel , startcollage , preferedcourse , specializationn}
    console.log(info);
    let addinfo = await admusers.updateMany({_id:loginuser._id} , {$set:{basicinfo:info}});
    console.log(addinfo);
    return res.status(200).send(addinfo);
  }catch(err){
    console.log(err);
  }
 
}

const updatebasicprofile=async(req,res)=>{
    try{
        const {name, email, whatsApp, phone, zender, city, state} = req.body;
        console.log(name, email, whatsApp, phone, zender, city, state)
        const token = req.headers.token;
        let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
        console.log(verifyuser);
        let loginuser = await admusers.findOne({_id:verifyuser.id})
        let updatedInfo = await admusers.updateMany({_id:loginuser._id} , {$set:{name, email, whatsApp, phone, zender, city, state}})
        return res.status(200).send({data:updatedInfo});
    }catch(err){
        console.log(err);
    }
}

  const updatebesicdata=async(req,res)=>{
    try{

        const {objective , countrypreference , courselevel , startcollage , preferedcourse , specializationn , budget} = req.body;
        console.log(preferedcourse , specializationn);
        const token = req.headers.token;
        let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
        console.log(verifyuser);
        let info = {objective , countrypreference , courselevel , startcollage , preferedcourse , specializationn , budget};
        let loginuser = await admusers.findOne({_id:verifyuser.id})
        let updatedBesicData = await admusers.updateMany({_id:loginuser._id} , {$set:{basicinfo:info}})
        return res.status(200).send({data:updatedBesicData});
    }catch(err){
        console.log(err)
    }
  }

  const uploadexperience=async(req,res)=>{
    try{
        const {jobRole , compny , desc , startDate , endDate} = req.body;
        const token = req.headers.token;
        let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
        console.log(verifyuser);
        let info = {jobRole , compny , desc , startDate , endDate};
        let uploadedExp = await admusers.updateMany({_id:verifyuser.id} , {$push:{experience:info}});
        return res.status(200).send({data:uploadedExp});
    }catch(err){
        console.log(err);
    }
  }
  const updateadditionalinfo=async(req,res)=>{
    try{
        const { name , contact , email , addline1 , addline2 , pincode , city , state , country , spouseName , spousePhone } = req.body;
        const token = req.headers.token;
        console.log(name , contact);
        let temp =    { name , contact , email , addline1 , addline2 , pincode , city , state , country , spouseName , spousePhone } ;

        let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
        console.log(verifyuser);
        let updatedadditionalInfo = await admusers.updateMany({_id:verifyuser.id} , {$set:{additionalinfo:temp}})
        return res.status(200).send({data:updatedadditionalInfo});
    }catch(err){
        console.log(err);
    }
  }

  const updatelordetails=async(req,res)=>{
    try{
    const { recmdFullName , email , phone , relnwithContact , designOfContact , orgnOfContact , postalAdd} = req.body;
    const token = req.headers.token;
    console.log(recmdFullName);
    let temp =    { recmdFullName , email , phone , relnwithContact , designOfContact , orgnOfContact , postalAdd } ;
    let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
    console.log(verifyuser);
    let updatedLor = await admusers.updateMany({_id:verifyuser.id} , {$push:{lordetails:temp}});
    return res.status(200).send({data:updatedLor});
    }catch(err){
        console.log(err);
    }
  }

  const uploadtestscore=async(req,res)=>{
    try{
      const token = req.headers.token;
      const testName = req.params['testName'];
      let alltests = ["GRE" , "GMAT" , "IELTS" , "PTE" , "DOULINGO"];
      const indexoftest = alltests.indexOf(testName);
      console.log(indexoftest);
      let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
      if(indexoftest===0){
        const { score , anlwDate , verbScore , quntScore , anlScore , examDate} = req.body;
        let newGreScore = {score , anlwDate , verbScore , quntScore , anlScore , examDate}
        let uploadedscore = await admusers.updateMany({_id:verifyuser.id}, {$push:{"totalScore.0.greScore": newGreScore}})
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===1){
        const { score , integratedReasoningScore , verbScore , quntScore , anlScore , examDate} = req.body;
        let newgmatScore = {score , integratedReasoningScore , verbScore , quntScore , anlScore , examDate}
        let uploadedscore = await admusers.updateMany({_id:verifyuser.id}, {$push:{"totalScore.0.gmatScore": newgmatScore}})
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===2){
        const { score , resultDate , englishScore , listeningScore , readingScore , writingScore , speakingScore , trfNumber , examDate} = req.body;
        let newieltsScore = { score , resultDate , englishScore , listeningScore , readingScore , writingScore , speakingScore , trfNumber , examDate}
        let uploadedscore = await admusers.updateMany({_id:verifyuser.id}, {$push:{"totalScore.0.ielts": newieltsScore}})
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===3){
        const { score , listeningScore , readingScore , writingScore , speakingScore , registerNo , examDate} = req.body;
        let newpteScore = { score , listeningScore , readingScore , writingScore , speakingScore , registerNo , examDate}
        let uploadedscore = await admusers.updateMany({_id:verifyuser.id}, {$push:{"totalScore.0.pte": newpteScore}})
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===4){
        const { score ,  examDate} = req.body;
        let newdoungliScore = { score ,  examDate}
        let uploadedscore = await admusers.updateMany({_id:verifyuser.id}, {$push:{"totalScore.0.doulingo": newdoungliScore}})
        return res.status(200).send({data:uploadedscore})
      }
      console.log(verifyuser);
    }catch(err){
      console.log(err);
    }

  }
  const updateexperience=async(req,res)=>{
    try{
      try{
        const {jobRole , compny , desc , startDate , endDate} = req.body;
        const token = req.headers.token;
        const id = req.params['id'];
        console.log(id);
        let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
        console.log(verifyuser);
        let info = {jobRole , compny , desc , startDate , endDate};
        let uploadedExp = await admusers.findOneAndUpdate({_id:verifyuser.id , "experience._id" : id} , {$set:{"experience.$.jobRole":jobRole , "experience.$.compny":compny , "experience.$.desc": desc , "experience.$.startDate":startDate , "experience.$.endDate":endDate  }});
        return res.status(200).send({data:uploadedExp});
    }catch(err){
        console.log(err);
    }
    }catch(err){
      console.log(err);
    }
  }

  const updatetestscore=async(req,res)=>{
    try{
      console.log("hy");
      const token = req.headers.token;
      let param = req.params['testName'];
      const id = param.split(":")[0];
      const testName = param.split(":")[1];
      let alltests = ["GRE" , "GMET" , "IELTS" , "PTE" , "DOULINGO"];
      const indexoftest = alltests.indexOf(testName);
      console.log(indexoftest);
      let verifyuser = await jwt.verify(token , process.env.SECREAT_KEY);
      if(indexoftest===0){
        const { score , anlwDate , verbScore , quntScore , anlScore , examDate} = req.body;
        // let newGreScore = {score , anlwDate , verbScore , quntScore , anlScore , examDate}
        let uploadedscore = await admusers.findOneAndUpdate({_id:verifyuser.id , "totalScore.greScore._id":id} , {$set:{"totalScore.$.greScore.$[book].score":score , "totalScore.$.greScore.$[book].anlwDate":anlwDate  , "totalScore.$.greScore.$[book].verbScore":verbScore , "totalScore.$.greScore.$[book].quntScore":quntScore , "totalScore.$.greScore.$[book].anlScore":anlScore , "totalScore.$.greScore.$[book].examDate":examDate , }} , {arrayFilters: [{ "book._id":id}]})   // here 0 is used to acces first object of id matched if i will not pul 0 then only updated object will stored and other will be deleted
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===1){
        const { score , integratedReasoningScore , verbScore , quntScore , anlScore , examDate} = req.body;
        // let newgmatScore = {score , integratedReasoningScore , verbScore , quntScore , anlScore , examDate}
        let uploadedscore = await admusers.findOneAndUpdate({_id:verifyuser.id , "totalScore.gmatScore._id":id} , {$set:{"totalScore.$.gmatScore.$[book].score":score , "totalScore.$.gmatScore.$[book].integratedReasoningScore":integratedReasoningScore ,  "totalScore.$.gmatScore.$[book].verbScore":verbScore , "totalScore.$.gmatScore.$[book].quntScore":quntScore , "totalScore.$.gmatScore.$[book].anlScore":anlScore , "totalScore.$.gmatScore.$[book].examDate":examDate , }} , {arrayFilters: [{ "book._id":id}]})   // here 0 is used to acces first object of id matched if i will not pul 0 then only updated object will stored and other will be deleted
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===2){
        const { score , resultDate , englishScore , listeningScore , readingScore , writingScore , speakingScore , trfNumber , examDate} = req.body;
        // let newieltsScore = { score , resultDate , englishScore , listeningScore , readingScore , writingScore , speakingScore , trfNumber , examDate}
        let uploadedscore = await admusers.findOneAndUpdate({_id:verifyuser.id , "totalScore.ielts._id":id} , {$set:{"totalScore.$.ielts.$[book].score":score , "totalScore.$.ielts.$[book].resultDate":resultDate , "totalScore.$.ielts.$[book].englishScore":englishScore , "totalScore.$.ielts.$[book].listeningScore":listeningScore , "totalScore.$.ielts.$[book].readingScore":readingScore , "totalScore.$.ielts.$[book].writingScore":writingScore , "totalScore.$.ielts.$[book].speakingScore":speakingScore , "totalScore.$.ielts.$[book].trfNumber":trfNumber , "totalScore.$.ielts.$[book].examDate":examDate  }} , {arrayFilters: [{ "book._id":id}]})   // here 0 is used to acces first object of id matched if i will not pul 0 then only updated object will stored and other will be deleted
        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===3){
        const { score , listeningScore , readingScore , writingScore , speakingScore , registerNo , examDate} = req.body;
        // let newpteScore = { score , listeningScore , readingScore , writingScore , speakingScore , registerNo , examDate}

        let uploadedscore = await admusers.findOneAndUpdate({_id:verifyuser.id , "totalScore.pte._id":id} , {$set:{"totalScore.$.pte.$[book].score":score , "totalScore.$.pte.$[book].listeningScore":listeningScore , "totalScore.$.pte.$[book].readingScore":readingScore , "totalScore.$.pte.$[book].writingScore":writingScore , "totalScore.$.pte.$[book].speakingScore":speakingScore , "totalScore.$.pte.$[book].registerNo":registerNo , "totalScore.$.pte.$[book].examDate":examDate , }} , {arrayFilters: [{ "book._id":id}]})   // here 0 is used to acces first object of id matched if i will not pul 0 then only updated object will stored and other will be deleted

        return res.status(200).send({data:uploadedscore})
      }else if(indexoftest===4){
        const { score ,  examDate} = req.body;
        let newdoungliScore = { score ,  examDate}
        let uploadedscore = await admusers.findOneAndUpdate({_id:verifyuser.id , "totalScore.doulingo._id":id} , {$set:{"totalScore.$.doulingo.$[book].score":score ,  "totalScore.$.doulingo.$[book].examDate":examDate , }} , {arrayFilters: [{ "book._id":id}]})   // here 0 is used to acces first object of id matched if i will not pul 0 then only updated object will stored and other will be deleted
        return res.status(200).send({data:uploadedscore})
      }
      console.log(verifyuser);
    }catch(err){
      console.log(err);
    }
  }
module.exports = {addbasicinfo , updatebasicprofile , updatebesicdata , uploadexperience , updateadditionalinfo , updatelordetails , uploadtestscore
                 , updateexperience , updatetestscore}