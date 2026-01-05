import { Request, Response } from "express";
import * as authService from "../services/user";

export const register = async (req: Request, res: Response) => {
    try{
        const user = await authService.registerUser(
            req.body.email,
            req.body.password
        );

        if(typeof user === 'object' && 'error' in user && user.error){
            return res.json({success:false,message: user.error});
        }

    
        res.status(201).json({
            success:true,
            data: user
        });
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try{
        const token = await authService.loginUser(
            req.body.email,
            req.body.password
        );
        
        if(typeof token === 'object' && token.error){
            return res.json({success:false,message: token.error});
        }

        res.json({success:true,token});
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};
