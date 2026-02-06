/**Starting server and connecting to the database */

require("dotenv").config()
const mongoose = require("mongoose")
const connectToDB = require("./src/config/database")
const app = require("./src/app")


connectToDB()

app.listen(3000, ()=>{
    console.log("Server running on port 3000...")
})