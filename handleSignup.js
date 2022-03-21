const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const emptyBody = new Error("KEY_ERROR");

const createUser = async (res,email,password) =>{
    
    const hashPassword = bcrypt.hashSync(password, 3);

    await prisma.$queryRaw`
    INSERT INTO users(email, password) VALUES (${email}, ${hashPassword});
    `
    
    return res.status(201).json({message:"CREATED"})
}


const isvaildEmail = async (email) =>{
    const [existEmail] = await prisma.$queryRaw`
    SELECT email FROM users WHERE email=${email};
    `;
    return existEmail; 
}


const postSignup = async(req,res) => {
    const {email, password} = req.body;

    try{
        if(email === "" || password === ""){
            throw emptyBody;
        }
        
        if( !isvaildEmail(email)) {
           return  res.status(409).json({message:"EXSITING_USER"})
         } 
        else{
            return password.length>8 ? createUser(res,email, password) : res.status(400).json({message:"PASSWORD_TOO_SHORT"})
        }

    } catch (err){
        console.log(err);
        return   err == nullBody ? res.status(400).json({message:nullBody.message}) : res.status(500).json({message:err.message});
    }

}

module.exports = {postSignup}