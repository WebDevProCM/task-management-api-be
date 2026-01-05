import { Task } from "../models/task";

export const createTask = async (data: any) => {
    return Task.create(data);
};

export const getTasks = async (page: number, limit: number) => {
    // handling pagination
    const skip = (page - 1) * limit;

    const tasks = await Task.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    const total = await Task.countDocuments();

    return { tasks, total };
};

export const getTaskById = async (id: string) => {
    return Task.findById(id);
};

export const updateTask = async (id: string, data: any) => {
    return Task.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTask = async (id: string) => {
    return Task.findByIdAndUpdate(id, {deleted: true}, {new: true});
};
