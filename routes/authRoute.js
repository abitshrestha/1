import express from 'express';
import { registerController,loginController } from '../controllers/authController.js';
import { isAdmin, requiresSignIn } from '../middleware/authmiddleware.js';

const router=express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.get('/user-auth',requiresSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
router.get('/',(req,res)=>{
    res.send('hello');
})

router.get('/admin-auth',requiresSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

export default router;