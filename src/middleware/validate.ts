import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

//middleware that uses Zod schemas to validate req.body
export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      
      //send structured format error message if validation failed
      if (!result.success) {
        const formattedErrors = result.error.flatten().fieldErrors;
        return res.status(400).json({success:false, message: formattedErrors })
      }
      next();
    } catch (err: any) {
      res.status(400).json({success:false, message: err });
    }
};
