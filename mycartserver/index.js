import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/mycart",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("Database connected");
})

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

const User = new mongoose.model("User",userSchema)

//Routes
app.post('/login',(req,res)=>{
    const {email,password}= req.body
    User.findOne({email:email},(err,user)=>{
        if(user)
             if(password==user.password){
                res.send({message:"Login Successfuly",user:user});
            }
            else{
                res.send({message: "Incorrect Password"});
            }
            else
            res.send({message: "user not registered"});
        
    })
})
app.post('/register',(req,res)=>{
    const {fname,lname,email,password}= req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message: "user is already registered"})
        }
        else{
            const user = new User({
                fname,
                lname,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({ message: "Successfully Registered"})
                }
            })
        }
    })
    
})
app.listen(3000,()=>{
    console.log("Database started at port 3000");
})