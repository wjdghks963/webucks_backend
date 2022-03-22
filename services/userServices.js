const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require("../models/userDao");

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, 3);
}


const changePassword =  (email, password) =>{
     userDao.updateUserPassword(email, hashPassword(password));
};

const createUser = (email, password) =>{
     userDao.createUser(email, hashPassword(password));
}

const isvaildEmail = async (email) =>{
    let re = await userDao.findEmail(email);
    if(re===undefined) false
    else{return true}
}



const makeToken = (email, password) =>{
  let token =  jwt.sign({
        email,
        password
    },
   process.env.JWT_SECRET,{
       expiresIn:'1h'
   }
   )
   console.log(token)
   return token
   }

const login = async (userEmail,password) =>{

    const dbPassword = await userDao.findPassword(userEmail);
    const ok =  await bcrypt.compare(password, dbPassword.password)
   
    return ok;
}




module.exports = {changePassword, createUser, isvaildEmail, makeToken, login};