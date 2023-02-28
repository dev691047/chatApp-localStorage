const express=require("express");
const app=express();
const fs = require('fs');
const {LocalStorage}=require('node-localstorage') ;
var localStorage = new LocalStorage('./scratch');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({extended: true})); 


app.get("/",(req,res,next)=>{
    res.send("<form action='/msg' method='post'><input name='loginName' type='text'/><button type='submit'>login</button></form>");
})

app.use("/msg",(req,res)=>{
    if(req.body.loginName){
        localStorage.setItem("username",req.body.loginName)
    }
    
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(`<h2>message </h2>${data}<form action='/msg2' method='post'><input name='message' type='text'/><button type='submit'>send</button></form>`);
      });
    console.log("message send"); 
})

app.post("/msg2",(req,res)=>{
   
    fs.appendFile("message.txt",  `${localStorage.getItem("username")}:${req.body.message} , `, (err) => {
        if (err) {
          console.log(err);
        }
        else {
            fs.readFileSync("message.txt", "utf8");
        }
      })
      res.redirect('/msg');
 
})

app.listen(3000,()=>console.log("server is running"));