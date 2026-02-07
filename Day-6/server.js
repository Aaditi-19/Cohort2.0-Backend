/**starting server and connecting to the database */
require("dotenv").config()

const app = require("./src/app")
const mongoose = require("mongoose")

// console.log("MONGO_URI =", process.env.MONGO_URI);

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to database")
        })
}
connectToDB()

app.listen(3000, (req, res)=>{
    console.log("Server is running on port 3000...")
})