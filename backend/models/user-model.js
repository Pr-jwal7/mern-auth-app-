const bcrypt = require("bcryptjs"); // necessary for hashing the password
const mongoose = require("mongoose");  
const jwt = require("jsonwebtoken");  

//now will create instance of the mongoose schema
// Defining User schema :=

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        require : true, // mai nahi chahta ki ise koi khaali chod de
    },
    
    email :{
        type: String,
        require : true,
    },
 
    password :{
        type: String,
        require : true, 
    },

    isAdmin :{
        type : Boolean,
        default : false, // har ek ko admin nhi bana skte 
    },
});


//using pre method to secure password : lec11
userSchema.pre('save',async function(next){
    //console.log("pre method" , this);
    const user = this;

    if(!user.isModified("password")){   //if password is same
        next();
    }

    //but if password is newly created
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;

    } catch (error) {
        next(error);
    }
})

// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);          // this me mujhe data mil jata hai
}

userSchema.methods.generateToken = async function() {
    try {
        console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);
        return jwt.sign({
            // first we need to pass the payload :- i.e us user ki identity
            userId : this._id.toString(), // converting userId to string and then passing it
            email : this.email,
            isAdmin : this.isAdmin,         // so this is my payload

        },
        // pass the signature
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d",   //optional kitne din me expire hoga 
        }
    
        );
        

    } catch (error) {
        console.error(error);
    }
};

//defining the model := 
const User = new mongoose.model("User",userSchema);
module.exports = User;
