const express =require("express")
const cors =require("cors")
const dotenv =require("dotenv")
const colors=require("colors")
const morgan =require("morgan")
const connectDB=require("./config/db");
const app=express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth",require("./routes/userRoute"));
app.use("/api/v1/post",require("./routes/postRoute"));

// for production use
app.get("/",(req,res)=>{
  res.status(200).send({
    "success": true,
    "message": "Server is running"
  })
})
const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
  console.log(`Server Running ${PORT}`)
})