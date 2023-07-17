import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export const getEmail = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const session = await db.collection('session').findOne({ token });
    if (!token || !session) return res.sendStatus(401);

    const { email } = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });

    console.log(email);

    res.locals = { ...res.locals, email };

  } catch (err) { res.status(500).send(err.message); }

  next();
};