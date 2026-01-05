import { Schema, model, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "completed";
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String 
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    deleted:{
        type:Boolean,
        default: false
    }
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
