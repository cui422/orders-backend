import express from 'express';
import OrderController from '../controllers/OrderController';

const router = new express.Router();

router.post('/create', (req, res) => {
  OrderController.createOrder(req, res);
});

router.post('/:orderId/cancel', (req, res) => {
  OrderController.cancelOrder(req, res);
});

router.get('/orders/:orderId', (req, res) => {
  OrderController.getOrder(req, res);
});

export default router;
