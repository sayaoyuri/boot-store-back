import { Router } from 'express';
import { validateSchema } from '../middlewares/schema.validate.js';
import {
  getOrder, postOrder, deleteOrder, postCheckout, getOrders, deleteOrders
} from '../controllers/orders.controller.js';
import { email_schema, order_schema } from '../schemas/orders.schema.js';
import { validateAuth } from '../middlewares/auth.validate.js';
import { getDate } from '../middlewares/date.utils.js';

const orders_Router = Router();
orders_Router.use(validateAuth);
orders_Router.use(getDate);
orders_Router.get('/order', validateSchema(email_schema), getOrder);
orders_Router.post('/order', validateSchema(order_schema), postOrder);
orders_Router.delete('/order/:index', validateSchema(email_schema), deleteOrder);
orders_Router.post('/order/checkout', validateSchema(email_schema), postCheckout);
orders_Router.get('/orders', validateSchema(email_schema), getOrders);
orders_Router.delete('/orders', validateSchema(email_schema), deleteOrders);

export default orders_Router;
