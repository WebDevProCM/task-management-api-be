import { Router } from "express";
import { register, login } from "../controllers/user";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validation/user";

const router = Router();

//handling authentication/authorization and req.body validation
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
