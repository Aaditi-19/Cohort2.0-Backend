/**starting server and connecting to the database */

const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect("mongodb+srv://aaditi:NavDltbsbVongW4E@cluster0.vam1yi2.mongodb.net/Day-6")
        .then(()=>{
            console.log("Connected to database")
        })
}
connectToDB()

app.listen(3000, (req, res)=>{
    console.log("Server is running on port 3000...")
})