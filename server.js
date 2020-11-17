
const express=require("express");
const connectDB= require("./config/db");


const app=express();

//connect database
connectDB();

//Initialise middleware to share the data
app.use(express.json({extended:false}));

app.get("/",(req,res)=>res.send("API is running"));

//define routes

app.use("/api/register",require("./routes/api/register"));
app.use("/api/login",require("./routes/api/login"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/posts",require("./routes/api/posts"));



const PORT= process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));