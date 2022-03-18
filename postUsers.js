const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const postUsers = async (req,res) =>{

    const {email, password} = req.body;

try{
const changePassword = await prisma.$queryRaw`
UPDATE users SET password=${password} WHERE email=${email};
`;
console.log(email,password);
return res.status(200).send("password changed");

}
catch(err){
    console.log(err);
    res.status(404).end("CAN'T FIX PASSWORD")
}
}

module.exports = {postUsers};