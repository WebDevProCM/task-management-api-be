import { Request, Response } from "express";
import * as taskService from "../services/task";
import { AuthRequest } from "../middleware/auth";

export const createTask = async (req: AuthRequest, res: Response) => {
    try{
        const task = await taskService.createTask(req.body, req.userId!);
        res.status(201).json({success:true, message:"task created", data:task});
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    try{
        //handling pagination and adding default page,limit no
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
    
        const data = await taskService.getTasks(page, limit, req.userId!);
        res.status(200).json({success:true, message:"tasks fetched!", data:data});
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};

export const getTask = async (req: AuthRequest, res: Response) => {
    try{
        const task = await taskService.getTaskById(req.params.id, req.userId!);
        if (!task) return res.status(404).json({success:false, message: "Task not found" });
        res.status(200).json({success:true, message:"task fetched!", data:task});
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    try{
        const task = await taskService.updateTask(req.params.id, req.body, req.userId!);
        res.status(200).json({success:true, message:"Task updated!" ,data: task});
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try{
        await taskService.deleteTask(req.params.id, req.userId!);
        res.status(200).json({success:true, message: 'Task deleted successfully!'});
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
};
