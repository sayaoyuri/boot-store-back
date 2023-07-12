import { Router } from "express";
import { validateSchema } from "../middlewares/schema.validate.js";
import { registerGameSchema }  from '../schemas/game.schemas.js';
import { registerGame } from "../controllers/game.controller.js";

const games_Router = Router();

games_Router.post('/register-game', validateSchema(registerGameSchema), registerGame);

export default games_Router;