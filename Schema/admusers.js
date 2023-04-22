const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admusersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    whatsApp:{
        type:Number
    },
    zender:{
        type:String
    },
    DOB:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    merriedOrNot:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    basicinfo:[
        {
            objective:{
                type:String
            },
            countrypreference:{
                type:String
            },       
            courselevel:{
                type:String
            },
            startcollage:{
                type:String
            },
            preferedcourse:{
                type:String
            },
            specializationn:{
                type:String
            },
            budget:{
                type:String
            }
        }
    ],
    experience:[
        {
            jobRole:{
                type:String
            },
            compny:{
                type:String
            },
            desc:{
                type:String
            },
            startDate:{
                type:String
            },
            endDate:{
                type:String
            }
        }
    ],
    totalScore:[
        { 
            greScore:[
                {
                    testName:{
                        type:String,
                        default:"GRE"
                    },
                    score:{
                        type:Number
                    },
                    anlwDate:{
                        type:String
                    },
                    verbScore:{
                        type:Number
                    },
                    quntScore:{
                        type:Number
                    },
                    anlScore:{
                        type:Number
                    },
                    examDate:{
                        type:String
                    }

                }
            ],
            gmatScore:[
                {
                    testName:{
                        type:String,
                        default:"GMAT"
                    },
                    score:{
                        type:Number
                    },
                    integratedReasoningScore:{
                        type:Number
                    },
                    verbScore:{
                        type:Number
                    },
                    quntScore:{
                        type:Number
                    },
                    anlScore:{
                        type:Number
                    },
                    examDate:{
                        type:String
                    }

                }
            ],
            ielts:[
                {
                    testName:{
                        type:String,
                        default:"IELTS"
                    },
                    score:{
                        type:Number
                    },
                    resultDate:{
                        type:String
                    },
                    englishScore:{
                        type:Number
                    },
                    listeningScore:{
                        type:Number
                    },
                    readingScore:{
                        type:Number
                    },
                    writingScore:{
                        type:Number
                    },
                    speakingScore:{
                        type:Number
                    },
                    trfNumber:{
                        type:Number
                    },
                    examDate:{
                        type:String
                    }

                }
            ],
            pte:[
                {
                    testName:{
                        type:String,
                        default:"PTE"
                    },
                    score:{
                        type:Number
                    },
                    listeningScore:{
                        type:Number
                    },
                    readingScore:{
                        type:Number
                    },
                    writingScore:{
                        type:Number
                    },
                    speakingScore:{
                        type:Number
                    },
                    registerNo:{
                        type:Number
                    },
                    examDate:{
                        type:String
                    }

                }
            ],
            doulingo:[
                {
                    testName:{
                        type:String,
                        default:"DOULINGO"
                    },
                    score:{
                        type:Number
                    },
                    examDate:{
                        type:String
                    }
                }
            ]

        }
    ],
    additionalinfo:[
        {
            name:{
                type:String
            },
            contact:{
                type:Number
            },
            email:{
                type:String
            },
            addline1:{
                type:String
            },
            addline2:{
                type:String
            },
            pincode:{
                type:Number
            },
            city:{
                type:String
            },
            state:{
                type:String
            },
            country:{
                type:String
            },
            spouseName:{
                type:String
            },
            spousePhone:{
                type:Number
            }
        }
    ],
    lordetails:[
        {
            recmdFullName:{
                type:String
            },
            email:{
                type:String
            },
            phone:{
                type:Number
            },
            relnwithContact:{
                type:String
            },
            designOfContact:{
                type:String
            },
            orgnOfContact:{
                type:String
            },
            postalAdd:{
                type:String
            }
        }
    ]
})


admusersSchema.pre("save",async function(next){
    try{
      if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password,10);
          next();
      }
    }catch(err){
      console.log(err);
    }
  })
  
  admusersSchema.methods.generateAuthToken = async function(next){
      try{
          const token = await jwt.sign({id:this._id} , process.env.SECREAT_KEY)
          this.tokens = this.tokens.concat({token});
          await this.save();
          return token
          next();
      }catch(err){
          console.log(err)
      }
    
  }

const admusers = new mongoose.model("admusers" , admusersSchema);
module.exports = admusers