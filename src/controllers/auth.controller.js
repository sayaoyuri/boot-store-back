import { db } from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (user) return res.sendStatus(409);

    const password_hash = bcrypt.hashSync(password, 10);
    await db.collection('users').insertOne({ name, email, password: password_hash });

    res.sendStatus(201);
  }
  catch (err) { res.status(500).send(err.message); }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    const validate_password = bcrypt.compareSync(password, user.password);

    if (!user) return res.status(404).send("Usuário não cadastrado");
    if (!validate_password) return res.status(401).send("Senha incorreta");

    const token = uuid();

    await db.collection("session").deleteMany({ userId: user._id });
    await db.collection("session").insertOne({ token, userId: user._id });
    return res.send(token);
  }
  catch (err) { res.status(500).send(err.message); }
};
