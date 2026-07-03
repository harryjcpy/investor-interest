import { Request, Response } from "express";
import { getNotifications } from "../services/notification.service";

export async function notificationController(
  req: Request,
  res: Response
) {
  try {

    const notifications = await getNotifications(req.user!.id);

    return res.status(200).json({
      success: true,
      data: notifications,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}