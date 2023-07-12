import { db } from "../database/database.connection.js";

export const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const session = await db.collection('session').findOne({ token });

    if (!token || !session) return res.sendStatus(401);
    next();
  }
  catch (err) { res.status(500).send(err.message); }
};
