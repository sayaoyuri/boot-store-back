import { Router } from "express";
import auth_Router from "./auth.routes.js";
import game_Router from "./game.routes.js";
import orders_Router from "./orders.router.js";
import { getDate } from "../middlewares/date.utils.js";

const router = Router();

router.use(getDate);
router.use(auth_Router);
router.use(game_Router);
router.use(orders_Router);

export default router;