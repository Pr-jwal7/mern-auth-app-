
const { z } = require("zod"); 

// creating an object schema

const signupSchema = z.object({
    username : z
    .string({required_error : "Name is required"})
    .trim()
    .min(3,{message: "Name must be of at least 3 characters"})
    .max(255,{message : "Name must doesnt not exceed char limit of 255"}),

    email : z
    .string({required_error : "Email is required"})
    .trim()
    .email({message : "Invalid email address"})
    .min(3,{message: "Email must be of at least 3 characters"})
    .max(255,{message : "Email must doesnt not exceed char limit of 255"}),

    phone : z
    .string({required_error : "Phone is required"})
    .trim()
    .min(10,{message: "Phone must be of at least of 10 characters"})
    .max(20,{message : "Phone must doesnt not exceed char limit of 20"}),

    password : z
    .string({required_error : "Password is required"})
    .min(7,{message: "Password must be of at least 6 characters"})
    .max(255,{message : "Password must doesnt not exceed char limit of 1024 characters"})

});

module.exports = signupSchema;
