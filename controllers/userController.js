const userDao = require("../models/userDao");
const userService = require('../services/userServices');

const getUsersInfo = async (req,res) =>{
    try{
    const userEmail = await userDao.allUserInfo();
    
    if(userService.verifyUser(req)){
        console.log("1")
       }
       
    return res.json(userEmail)
    
    }
    catch(err){
        console.log(err);
        res.status(404).end("NO USERS IN THIS SITE")
    }
};

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



const createUser = async (req,res) => {

    const {email, password} = req.body;

    try{
        if(!email || !password){
            const emptyBody = userService.error("KEY_ERROR",400);
            throw emptyBody;
        }

        if(await userService.isvaildEmail(email)){
            const existEmailError = userService.error("EXSITING_USER", 409);
            throw existEmailError;
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
        if(!email || !password){
            const emptyBody = userService.error("KEY_ERROR",400);
            throw emptyBody;
        }

        if(!await userService.isvaildEmail(email)){
            const existEmailError = userService.error("MAYBE_WRONG_EMAIL", 409);
            throw existEmailError;
        }

        let loginOk = await userService.login(email,password);

       if(loginOk){
         let token = userService.makeToken(email,password);
         res.cookie('user',token,{httpOnly:true})
         res.status(200).json({token, message:"login sucess"});

       }else if(!loginOk){
        const wrongPassword = userService.err("WRONG_PASSWORD", 400);
        throw wrongPassword
       }

    }catch(err){
        return res.status(err.statusCode || 500).json({message:err.message});
    }

}

const userLoggedIn = (req,res) =>{
           
    if(userService.verifyUser(req)){
        return res.redirect('/')
      }

}

module.exports = {getUsersInfo, changePassword, createUser, login, userLoggedIn};