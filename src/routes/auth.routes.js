import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/schema.validate.js";
import { signin_schema, signup_schema } from "../schemas/auth.schemas.js";

const auth_Router = Router();
auth_Router.post("/sign-up", validateSchema(signup_schema), signup);
auth_Router.post("/sign-in", validateSchema(signin_schema), signin);
export default auth_Router;
