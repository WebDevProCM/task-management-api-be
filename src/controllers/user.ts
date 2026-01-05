import { Request, Response } from "express";
import * as authService from "../services/user";

export const register = async (req: Request, res: Response) => {
    try{
        const user = await authService.registerUser(
            req.body.email,
            req.body.password
        );
    
        res.status(201).json({
            id: user._id,
            email: user.email,
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
        const data = await authService.loginUser(
            req.body.email,
            req.body.password
        );
    
        res.json(data);
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};
