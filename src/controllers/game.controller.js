import { db } from "../database/database.connection.js"

export const registerGame = async (req, res) => {
  try {
    res.locals.views = 0;

    const result = await db.collection('games').insertOne(res.locals);
    if(result.acknowledged) return res.sendStatus(201);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}