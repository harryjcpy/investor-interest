import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validator";
import { registerUser } from "../services/auth.service";
import { loginSchema } from "../validators/auth.validator";
import { loginUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    if (error.message === "User already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


export async function login(req: Request, res: Response) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}