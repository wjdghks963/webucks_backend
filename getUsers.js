const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getUsers = async (req,res) =>{

try{
const userEmail = await prisma.$queryRaw`
SELECT * FROM users;
`;

return res.json(userEmail)

}
catch(err){
    console.log(err);
    res.status(404).end("NO USERS IN THIS SITE")
}
}

module.exports = {getUsers};