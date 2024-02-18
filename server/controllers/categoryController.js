import slugify from "slugify";
import { Category } from "../models/Category.js";

export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(200).send({
                success:false,
                message:'Name is required!',
            });
        }
        const slug=slugify(name);
        const existingCategory=await Category.findOne({slug});
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message:'Category already exists.',
            });
        }
        const category=await new Category({name,slug}).save();
        res.status(201).send({
            success:true,
            message:'New Category Created.',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while creating category',
        });
    }
}

export const getAllCategoryController=async(req,res)=>{
    try {
        const category=await Category.find({});
        res.status(200).send({
            success:true,
            message:'All category list.',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while fetching all category',
        });
    }
}