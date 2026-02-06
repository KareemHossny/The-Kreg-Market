const express =require("express")
const userRouter=express.Router()
const usercontroller=require("../controllers/user")

userRouter.post('/Login', usercontroller.Login)
userRouter.post('/Register', usercontroller.Register);
userRouter.post('/Admin',usercontroller.Admin);

module.exports=userRouter;

