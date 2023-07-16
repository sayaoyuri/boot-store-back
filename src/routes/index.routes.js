import { Router } from "express";
import auth_Router from "./auth.routes.js";
import game_Router from "./game.routes.js";

const router = Router();

router.use(auth_Router);
router.use(game_Router);

export default router;