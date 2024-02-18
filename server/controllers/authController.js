import { User } from "../models/User.js";
// import { comparePassword, hashPassword } from "../utils/authUtils.js";
import jwt from 'jsonwebtoken';

export const registerController=async(req,res)=>{
    try {
        const {username,email,password,phone,address,answer}=req.body;
        if(!username){
            return res.send({message:'Username is required!'});
        }
        if(!email){
            return res.send({message:'Email is required!'});
        }
        if(!password){
            return res.send({message:'Password is required!'});
        }
        if(!phone){
            return res.send({message:'Phone is required!'});
        }
        if(!address){
            return res.send({message:'Address is required!'});
        }
        if(!answer){
            return res.send({message:'Answer is required!'});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(200).send({success:false,message:'Email already taken!'});
        }
        // const hashedPassword=await hashPassword(password);
        const user=await new User({username,email,password,phone,address,answer}).save();
        res.status(201).send({
            success:true,
            message:'User registered successfully!',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Internal Server Error! Error in registration.',
        });
    }
}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.send({message:'Email or Password is invalid!'});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,message:'Email is not registered!',
            });
        }
        // const validPass=await comparePassword(password,user.password);
        // if(!validPass){
        //     return res.status(200).send({
        //         success:false,
        //         message:'Invalid Password',
        //     })
        // }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1hr',
        });
        res.status(200).send({
            success:true,
            message:'User login successful!',
            user:{
                username:user.username,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Internal Server Error! Error while logging in.',
        });
    }
}