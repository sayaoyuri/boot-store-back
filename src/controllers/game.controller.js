import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export const registerGame = async (req, res) => {
  try {
    res.locals.views = 0;

    const result = await db.collection('games').insertOne(res.locals);
    if (result.acknowledged) return res.sendStatus(201);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export const getAllGames = async (req, res) => {
  try {
    const games = await db.collection('games').find().limit(100).toArray();
    console.log(games);
    return res.send(games);
  } catch (e) {
    return res.status(500).send(e.message);
  };
};

export const getGameById = async (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) return res.sendStatus(422);

  try {
    const { value: game } = await db.collection('games').findOneAndUpdate({ _id: new ObjectId(id) }, {
      $inc: { views: 1 }
    }, { returnDocument: "after" });

    if (!game) return res.sendStatus(404);

    return res.send(game);
  } catch (e) {
    res.status(500).send(e.message);
  };
};