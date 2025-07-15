const User = require("../models/user-model") 
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const home = async(req,res) =>{   // async is fn , whenever use async use try and catch method
    try {
        res.status(200).send("Welcome to the learning phase , by Controller ");
        
    } catch (error) {
        console.log(error);
    }
} 


// ----- User Registration Logic -----

const register = async(req,res) =>{
    try {
        console.log(req.body); 
        const{username , email , phone , password} = req.body;
 
        const userExist = await User.findOne({email : email});

        if(userExist){
            return res.status(400).json({msg : "email already exists"});
        }

        //hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound);

        const userCreated = await User.create({
            username,
            email,
            phone, 
            password
        });


        res.status(201).json(
            {msg : "registration successful",
            token : await userCreated.generateToken(),
            userId : await userCreated._id.toString(),
        }); //generate Token here it is a fucntion

    } catch (error) {
        // res.status(500).json("internal server error.");
        next(error);
    }
}

// ----- User Login Logic -----
// pehle toh login fn banana pdega

const login = async(req,res) => {
    try {
        const {email , password} = req.body;    // req.body mein data mujhe mil gaya
                                                    // to check if the email is valid or not
        const userExist = await User.findOne({email});
        console.log(userExist);

        if(!userExist){ // agr user nhi hai toh 
            return res.status(400).json({message : "invalid credentials.."}); 
        }
        // if it exist then compare the password
        // const user = await bcrypt.compare(password,userExist.password); 

        const user = await userExist.comparePassword(password);
        
        if(user){
            res.status(200).json(
            {msg : "Login successful",
            token : await userExist.generateToken(),  // token ki hame need hai
            userId : await userExist._id.toString(),  // user id hame chahiye
            }); //generate Token here it is a fucntion
        }
        else{
             res.status(401).json({message : "invalid email or password"});
        }

    } catch (error) {
        res.status(500).json("internal server error");
    }
}

// ----- User Logic -----

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg : userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};


module.exports = {home,register,login,user};
