const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const notExist = new Error("INVALID_USER");

let token;

const login = async (res,userEmail,password) =>{
    
    const [dbPassword] = await prisma.$queryRaw`
    SELECT password FROM users WHERE email=${userEmail.email};
    `;

   const ok =  await bcrypt.compare(password, dbPassword.password)
   
   makeToken(userEmail.email, dbPassword.password);
    res.cookie('user', token);

 return   ok ? res.status(200).json({email:userEmail.email, password : dbPassword.password}) : res.status(400).send(notExist.message);
}

const makeToken = (email, password) =>{
 token =  jwt.sign({
     email,
     password
 },
'FADSFASDF',{
    expiresIn:'1h'
}
)
console.log(token)
return token
}

const loginUser = async (req,res) =>{

    const {email,password} = req.body;

try{

    const [userEmail] = await prisma.$queryRaw`
    SELECT email FROM users WHERE email=${email};
    `;

    if(!userEmail) throw notExist

    login(res, userEmail, password);

}
catch(notExist){
    res.status(400).send(notExist.message);
}

}

module.exports = {loginUser};