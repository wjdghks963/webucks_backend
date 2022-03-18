const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



const createUser = async (res,email,password) =>{
    await prisma.$queryRaw`
    INSERT INTO users(email, password) VALUES (${email}, ${password});
    `
    return res.status(201).json({message:"CREATED"})
}

const isvaildEmail = async (email) =>{
    const existEmail = await prisma.$queryRaw`
    SELECT email FROM users WHERE email=${email};
    `;
    return existEmail
}

const postSignup = async(req,res) => {
    try{
        const {email, password} = req.body;

        if(isvaildEmail(email)===email) {
            res.status(409).json({message:"EXSITING_USER"})
         } 
        else{
            if(password.length>8){
                    createUser(res,email, password)
            }else{
                    res.status(400).json({message:"PASSWORD_TOO_SHORT"})
            }
        }

    } catch (err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }

}

module.exports = {postSignup}