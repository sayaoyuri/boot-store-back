import { Router } from "express";
import auth_router from "./auth.routes.js";
import game_Router from "./game.routes.js";

const router = Router();

router.use(auth_router);
router.use(game_Router);

export default router;