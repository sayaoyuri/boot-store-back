import { Router } from 'express';
import { validateSchema } from '../middlewares/schema.validate.js';
import {
  getOrder, postOrder, deleteOrder, postCheckout, getOrders, deleteOrders
} from '../controllers/orders.controller.js';
import { order_schema } from '../schemas/orders.schema.js';
import { validateAuth } from '../middlewares/auth.validate.js';
import { getDate } from '../middlewares/date.utils.js';
import { getEmail } from '../middlewares/email.utils.js';

const orders_Router = Router();
orders_Router.use(getDate);
orders_Router.use(getEmail);
orders_Router.use(validateAuth);
orders_Router.get('/order', getOrder);
orders_Router.post('/order', validateSchema(order_schema), postOrder);
orders_Router.delete('/order/:index', deleteOrder);
orders_Router.post('/order/checkout', postCheckout);
orders_Router.get('/orders', getOrders);
orders_Router.delete('/orders', deleteOrders);

export default orders_Router;
