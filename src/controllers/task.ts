import { Request, Response } from "express";
import * as taskService from "../services/task";

export const createTask = async (req: Request, res: Response) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json({success:true, message:"task created", data:task});
};

export const getTasks = async (req: Request, res: Response) => {
    //handling pagination and adding default page,limit no
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await taskService.getTasks(page, limit);
    res.status(200).json({success:true, message:"tasks fetched!", data:data});
};

export const getTask = async (req: Request, res: Response) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({success:true, message:"task fetched!", data:task});
};

export const updateTask = async (req: Request, res: Response) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.status(200).json({success:true, message:"Task updated!" ,data: task});
};

export const deleteTask = async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).send({success:true, message: 'Task deleted successfully!'});
};
