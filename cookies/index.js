// const express = require('express') 
// const cookieParser = require('cookie-parser') 

// const app = express();
// app.use(express.json());
// app.use(cookieParser('GFG')) 

// app.get('/', function (req, res) { 
// res.cookie('name', 'GeeksForGeeks', { signed: true }).send(); 
// console.log(req.signedCookies) 
// }) 

// app.listen(4000, (err) => { 
// if(err) { console.log(err) } 
// else { console.log('Success1') } 
// }) 


const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookieParser('GFG'));

app.get('/',(req,res) => {
    res.cookie("name","geekForgeeks",{signed:true}).send();
    
    console.log(req.signedCookies);
})

app.listen(4000);