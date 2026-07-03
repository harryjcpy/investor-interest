import { Request, Response } from "express";
import { expressInterest } from "../services/interest.service";
import { expressInterestSchema } from "../validators/interest.validator";

export async function expressInterestController(
  req: Request,
  res: Response
) {
  try {
    const validatedData = expressInterestSchema.parse(req.body);

    const interest = await expressInterest(
      req.user!.id,
      validatedData.startupId
    );

    return res.status(201).json({
      success: true,
      data: interest,
    });

  } catch (error: any) {

    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    if (error.message === "Startup not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Interest already expressed") {
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