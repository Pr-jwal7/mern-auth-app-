
const { response } = require("express");
const Contact = require("../models/contact-model");

// const contactForm = async(req,res) => {
//     try {
//         const response = req.body ;
//         await Contact.create(response);
//         return response.status(200).json({message : "message sent successfully"});
//     } catch (error) {
//         return response.status(500).json({message : "message not delivered"});
//     }
// }
const contactForm = async (req, res) => {
    try {
        const formData = req.body;
        await Contact.create(formData);
        return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Message not delivered" });
    }
}

module.exports = contactForm;