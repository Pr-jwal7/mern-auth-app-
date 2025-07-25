const { parse } = require("../validators/auth-validator");

const validate = (schema) => async(req,res,next) => {
    try {
        const parseBody = await schema.parseAsync(req.body); 
        req.body = parseBody;
        next();

    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;

        // I will create an object error where I will have both my status and message which will be sent in next() for error

        const error = {
            status,
            message,
            extraDetails,
        };


        console.log(error); 
        // res.status(400).json({message: message});

        next(error);
    }
}

module.exports = validate;