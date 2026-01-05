import { Router } from "express";
import * as controller from "../controllers/task";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../validation/task";

const router = Router();

router.post("/", validate(createTaskSchema), controller.createTask);
router.get("/", controller.getTasks);
router.get("/:id", controller.getTask);
router.put("/:id", validate(updateTaskSchema), controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;
