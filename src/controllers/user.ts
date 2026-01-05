import { Request, Response } from "express";
import * as authService from "../services/user";

export const register = async (req: Request, res: Response) => {
    const user = await authService.registerUser(
        req.body.email,
        req.body.password
    );

    res.status(201).json({
        id: user._id,
        email: user.email,
    });
};

export const login = async (req: Request, res: Response) => {
    const data = await authService.loginUser(
        req.body.email,
        req.body.password
    );

    res.json(data);
};
