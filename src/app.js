const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const Register =  require("./models/registers");
require("./db/conn");
const port  = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// path set for static 
const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partial_path = path.join(__dirname, "../templates/partials")
app.use(express.static(static_path));

// path set for views
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

app.get("/",(req, res)=>{
    res.render("index")
})

app.get("/login",(req, res)=>{
    res.render("login")
})
app.get("/register",(req, res)=>{
    res.render("register");
})

app.post("/register",async(req, res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword){
          const registerEmployee = new Register({
            name : req.body.name,
            email : req.body.email,
            password : password,
            cpassword : cpassword
          })
          const registered = await registerEmployee.save();
          res.status(201).render("index");

        }else{
            // alert("passwords are not matching")
            res.send("passwords are not matching")
        }
    }catch(error){
        res.status(400).send(error);
    }
})

app.post("/login", async(req, res)=>{
    try{
        const email = req.body.email;
        const password =  req.body.password;

        const userEmail = await Register.findOne({email});
        
        // for bcrypt 
        const isSame  = await bcrypt.compare(password, userEmail.password);

        // if(userEmail.password === password){
        if(isSame){
            res.status(201).render("index");
        }else{
            res.send("Invalid login details");
        }

    }catch(error){
        res.status(400).send("Invalid login details");
    }
})
app.listen(port,()=>{
    console.log(`Server is running on port number ${port}`);
})
