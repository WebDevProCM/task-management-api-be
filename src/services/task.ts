import { Task } from "../models/task";

export const createTask = async (data: any, id:string) => {
    return Task.create({...data, user:id});
};

export const getTasks = async (page: number, limit: number, id:string) => {
    // handling pagination
    const skip = (page - 1) * limit;

    const tasks = await Task.find({user:id, deleted:false})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    const total = await Task.countDocuments();

    return { tasks, total };
};

export const getTaskById = async (id: string, user:string) => {
    return Task.findOne({_id:id, user, deleted:false});
};

export const updateTask = async (id: string, data: any, user:string) => {
    return Task.findOneAndUpdate({_id:id, user, deleted:false}, data, { new: true });
};

export const deleteTask = async (id: string, user:string) => {
    //soft delete
    return Task.findOneAndUpdate({_id:id, user}, {deleted: true}, {new: true});
};
