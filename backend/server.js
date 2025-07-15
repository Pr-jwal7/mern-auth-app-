require("dotenv").config(); // now we can use .env

const express = require("express")

const cors = require("cors");

const app = express()   // what is this?
//// 1️⃣ You import your router module:
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");

const connectDb = require("./utils/db") ; //  connectDb is a function now
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions ={
    origin: "http://localhost:5173" ,// mera react ispr run kr rha hai, agr yaha se data aa rha hai toh access de do
    methods:"GET,POST,PATCH,PUT,DELETE,HEAD " ,// for all this methods
    credentials : true,
}

// handling cors issue 
app.use(cors(corsOptions));// its a middleware 

app.use(express.json());


// 2️⃣ You “mount” that router at the `/api/auth` path:
app.use("/api/auth", authRoute); // mtlb router ka path mount kr diya api/path
app.use("/api/form" , contactRoute);

// 3️⃣ You also define two “inline” routes right here in server.js
app.get( "/" , (req,res) => {           // this is out home page
    res.status(200).send("Pdhayi kar bhai Advance aa rha hai");
});

app.get( "/register" , (req,res) => {   //this is our registration page
    res.status(200).send(`Welcome to the registration process. Let's start`);
});

// initialization of server
app.use(errorMiddleware);
const PORT = 5000;

connectDb().then( () =>{ // if everything is fine 
        app.listen(PORT, () =>{ // listen me PORT pass kr rha hun and ek call back function jaha main logo ko btaunga im using this tactic

        console.log(`Server is running at the port : ${PORT}`);

    });
}) ;



