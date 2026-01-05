import { Router } from "express";
import * as controller from "../controllers/task";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../validation/task";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, validate(createTaskSchema), controller.createTask);
router.get("/", auth, controller.getTasks);
router.get("/:id", auth, controller.getTask);
router.put("/:id", auth, validate(updateTaskSchema), controller.updateTask);
router.delete("/:id", auth, controller.deleteTask);

export default router;
