const  mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fistRegistration",{
}).then(()=>{
    console.log("connection successful");
}).catch(()=>{
    console.log("Connection faild");
})