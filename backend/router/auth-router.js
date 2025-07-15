
const express = require("express");
const router = express.Router(); // express.Router wali class ko call kr diya and store krdiya const variable me
// 1️⃣ You import your controller functions:
const authControllers = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const signupSchema = require("../validators/auth-validator");
const loginSchema = require("../validators/login-validator");
const validate = require("../middlewares/validate-middlewares");

// 2️⃣ You wire up HTTP methods + sub‑paths to controller handlers:
router.route("/").get(authControllers.home);

router.route("/register").post(validate(signupSchema) , authControllers.register); // if you are using post or else get

router.route("/login").post(validate(loginSchema) , authControllers.login); // if you are using post or else get

// home page this is := method 1 :-
// router.get('/' , (req,res) =>{
//     res.status(200).send("Welcome to the learning phase , by router.");
// })
// method 2 :=

// router.route("/").get((req,res)=>{
//     res.status(200).send("Welcome to the learning phase , by router.");
// })

// router.route("/register").get( (req,res) =>{
//     res.status(200).send("Welcome to the learning phase registration page , by router.");
// } )

//export krna jaruri hai

router.route("/user").get(authMiddleware , authControllers.user);


// 3️⃣ Export the router so server.js can “mount” it:
module.exports = router;
