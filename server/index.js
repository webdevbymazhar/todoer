const express = require("express")
const mongoose = require("mongoose")
const app = express()
const dotenv = require("dotenv")
const todoRoute = require("./routes/todoRoute")
var cors = require('cors')


dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/todo",todoRoute)


app.get("/",(req,res)=>{
    res.send("Hello from the other side")
})



mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

app.listen(8000,()=>{
 console.log("Listening from port 8000");
})