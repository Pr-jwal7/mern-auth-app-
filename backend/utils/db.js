
const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_admin";
//mongodb://127.0.0.1:27017/?

//const URI = "mongodb+srv://prajwal_007:DbUserDatabase@cluster0.hp3xbls.mongodb.net/mernAdmin?retryWrites=true&w=majority&appName=Cluster0";
const URI = "mongodb+srv://prajwal_007:DbUserDatabase@cluster0.hp3xbls.mongodb.net/mernAdmin?retryWrites=true&w=majority&appName=Cluster0";
//const URI = process.env.MONGO_DB_URI;
// m1 :- mongoose.connect(URI); // pass the url with whom you want to connect


const connectDB = async() => {
    try {
        await mongoose.connect(URI); // what exactly await is doing here?
        console.log("Connection was successful to DB.");
    } catch (error) {
        console.error("database connection failed.");
        process.exit(0);
    }
}

module.exports = connectDB;
 