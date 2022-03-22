const userDao = require("../models/userDao");
const userService = require('../services/userServices');

// 모든 유저, 유저에 대한 데이터
const getUsersInfo = async (req,res) =>{
    try{
    const userEmail = await userDao.allUserInfo();
    
    return res.json(userEmail)
    
    }
    catch(err){
        console.log(err);
        res.status(404).end("NO USERS IN THIS SITE")
    }
};

// user password change
const changePassword = async (req,res) =>{
    const {email, password} = req.body;

    try{

        await userService.changePassword(email, password);
    
        return res.status(200).send("password changed");
    }
    catch(err){
        console.log(err);
        res.status(404).end("CAN'T FIX PASSWORD")
    }
};

const createUser = async (req,res) =>{
    const {email, password} = req.body;

    try{
        if(!email || !password){
            const emptyBody = new Error("KEY_ERROR");
            emptyBody.statusCode = 400;
            throw emptyBody;
        }

        if(await userService.isvaildEmail(email)){
            const existEmailError = new Error("EXSITING_USER");
            existEmailError.statusCode = 409;
            throw existEmailError;
        }

        if(!password.length > 8) {
            const passwordShortError = new Error("PASSWORD_TOO_SHORT");
            passwordShortError.statusCode = 400;
            throw passwordShortError;
        }

      userService.createUser(email, password);
      return res.status(201).json({message:"CREATED"});
    }catch(err){
        console.log(err)
        return res.status(err.statusCode || 500).json({message:err.message});
    }
}

const login = async (req,res)=>{
    const {email, password} = req.body;
    
    try{

        if(!await userService.isvaildEmail(email)){
            const existEmailError = new Error("MAYBE_WRONG_EMAIL");
            existEmailError.statusCode = 409;
            throw existEmailError;
        }

        let loginOk = await userService.login(email,password);

       if(loginOk){
         let token = userService.makeToken(email,password);
         res.status(200).json({token, message:"login sucess"})
       }else if(!loginOk){
        const wrongPassword = new Error("WRONG_PASSWORD"); 
        wrongPassword.statusCode = 400;
        throw wrongPassword
       }
       
    }catch(err){
        return res.status(err.statusCode || 500).json({message:err.message});
    }

}


module.exports = {getUsersInfo, changePassword, createUser, login};