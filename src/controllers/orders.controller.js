import { db } from "../database/database.connection.js";
import Joi from "joi";

export const getOrder = async (req, res) => {

  try {
    const { email } = res.locals;
    const order = await db.collection('order').findOne({ email });
    res.send(order);
  } catch (err) { res.status(500).send(err.message); }

};

export const postOrder = async (req, res) => {

  try {
    const { date, email, ...items } = res.locals;
    const order = await db.collection('order').findOne({ email });

    if (!order) return res.status(403).send('Email não autorizado');

    const total = (order ? order.items.reduce((sum, item) => sum + item.price, 0) : 0) + items.price;

    await db.collection('order').updateOne({ email }, { $push: { items }, $set: { date, total } });
    return res.sendStatus(201);

  } catch (err) { res.status(500).send(err.message); }

};

export const deleteOrder = async (req, res) => {
  const index_schema = Joi.object({ index: Joi.number().min(0).required() });
  const validation = index_schema.validate(req.params, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const { index } = req.params;
    const { email } = res.locals;

    const order = await db.collection('order').findOne({ email });
    if (!order) return res.status(403).send('Email não cadastrado!');
    if (!(order.items.length > index)) return res.status(404).send(`Item na posição ${index} não encontrado!`);

    await db.collection('order').updateOne({ email }, { $unset: { [`items.${index}`]: 1 } });
    await db.collection('order').updateOne({ email }, {
      $inc: { total: -1 * parseFloat(order.items[index]?.price) },
      $pull: { items: null }
    });

    return res.sendStatus(204);

  } catch (err) { res.status(500).send(err.message); }

};

export const postCheckout = async (req, res) => {
  try {
    const { date, email } = res.locals;
    const { value: order } = await db.collection('order').findOneAndUpdate({ email }, {
      $set: { date }
    }, { returnDocument: "after" });

    if (!order) return res.status(403).send('Email não cadastrado!');
    if (order.items.length === 0) return res.status(404).send('Não foram encontrados itens no pedido.');

    await db.collection('orders').updateOne({ email }, { $push: { history: order } });
    await db.collection('order').updateOne({ email }, { $set: { items: [], total: 0 } });

    /* A implementar -- Envio de email de confirmação -- */
    return res.sendStatus(201);

  } catch (err) { res.status(500).send(err.message); }

};

export const getOrders = async (req, res) => {

  try {
    const { email } = res.locals;
    const orders = await db.collection('orders').findOne({ email });
    res.send(orders);

  } catch (err) { res.status(500).send(err.message); }

};

export const deleteOrders = async (req, res) => {
  try {
    const { email } = res.locals;
    const result = await db.collection('orders').updateOne({ email }, { $set: { history: [] } });

    if (result.matchedCount === 0) return res.status(403).send('Email não cadastrado!');
    if (result.modifiedCount === 0) return res.status(404).send('Não foram encontrados pedidos.');

    return res.sendStatus(204);

  } catch (err) { res.status(500).send(err.message); }
};