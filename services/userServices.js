const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require("../models/userDao");

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, 3);
}

const isvaildEmail = async (email) =>{
    let re = await userDao.findEmail(email);
    if(re===undefined) false
    else{return true}
}

const error = (content, status) => {
    let err = new Error(content);
     err.statusCode = status;
     return err
}

// post user_info

const changePassword = async (email, password) =>{
     userDao.updateUserPassword(email, hashPassword(password));
};

const createUser = (email, password) =>{        
    
    if(!password.length > 8) {
        const passwordShortError = error("PASSWORD_TOO_SHORT", 400);
        throw passwordShortError;
    }

     userDao.createUser(email, hashPassword(password));
}




// login

const makeToken = (email, password) =>{
    let token =  jwt.sign({
        email,
        password
    },
   process.env.JWT_SECRET,{
       expiresIn:'1h'
   }
   );

   return token
   }

const login = async (userEmail,password) =>{

    const dbPassword = await userDao.findPassword(userEmail);
    const ok =  await bcrypt.compare(password, dbPassword.password);
   
    return ok;
}

const verifyUser = async (req) => {  
    let verified = jwt.verify(req.cookies.user, process.env.JWT_SECRET);
    return verified;
}



module.exports = {changePassword, createUser, isvaildEmail, makeToken, login, verifyUser, error};
