//const { z } = require("zod");

// // Creating login schema
// const loginSchema = z.object({
//     email: z
//         .string({ required_error: "Email is required" })
//         .trim()
//         .email({ message: "Invalid email address" })
//         .min(3, { message: "Email must be at least 3 characters long" })
//         .max(255, { message: "Email must not exceed 255 characters" }),

//     phone: z
//         .string({ required_error: "Phone is required" })
//         .trim()
//         .min(10, { message: "Phone must be at least 10 characters long" })
//         .max(20, { message: "Phone must not exceed 20 characters" }),
// });

// module.exports = loginSchema;
const zod = require("zod");

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = loginSchema;
