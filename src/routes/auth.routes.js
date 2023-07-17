import { Router } from "express";
import { getAccount, signin, signup } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/schema.validate.js";
import { signin_schema, signup_schema } from "../schemas/auth.schemas.js";
import { getDate } from "../middlewares/date.utils.js";

const auth_Router = Router();
auth_Router.use(getDate);
auth_Router.post("/sign-up", validateSchema(signup_schema), signup);
auth_Router.post("/sign-in", validateSchema(signin_schema), signin);
auth_Router.get("/account", getAccount);
export default auth_Router;
