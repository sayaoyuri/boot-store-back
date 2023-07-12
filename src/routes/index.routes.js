import { Router } from "express";
import auth_router from "./auth.routes.js";

const router = Router();

router.use(auth_router);

export default router;