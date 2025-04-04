const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();

app.use(express.json());

const authentication = (req,res,next) => {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token,"JWT_PASSWORD")
        if(verified)
            next()
    }
    catch(err)
    {
        res.status(403).json({ message: 'Invalid Token' });
    }
}

app.post("/login",(req,res) => {
    const { username } = req.body;

    if(!username){
        return res.status(400).send("username is required")
    }

    const token = jwt.sign(username,"JWT_PASSWORD")

    res.json({
        token : token
    })

})

app.get("/",authentication,(req,res) => {

    res.json({
        mssge : "Welcome"
    })
    
})

app.listen(5000);


