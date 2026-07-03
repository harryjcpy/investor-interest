import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { expressInterestController } from "../controllers/interest.controller";

const router = Router();

router.post(
    "/express",
    authenticate,
    expressInterestController
);

export default router;