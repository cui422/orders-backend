import * as http from "http";
import Order from "../models/order";
import config from "../config/config";
import PaymentApiClass from "../payment/paymentApi";

const controller = {};

controller.createOrder = async (req, res) => {
  try {
    const token = req.body.token;

    const OrderToCreate = new Order({
      state: "Created"
    });
    const createdOrder = await Order.createOrder(OrderToCreate);
    // call payment api with token
    const paymentApi = new PaymentApiClass(http);

    // call the API
    paymentApi
      .verify(token)
      .then(async data => {
        if (data.result === true && data.token === token) {
          const confirmedOrder = await Order.updateStatus(
            createdOrder.id,
            "Confirmed"
          );
          setTimeout(async () => {
            await Order.updateStatus(createdOrder.id, "Delivered");
          }, config.confirmTime);
          res.status(200).send({ success: true, result: confirmedOrder.id });
        } else {
          res.status(401).send({ success: false, message: "Invalid Order!" });
        }
      })
      .catch(err => {
        console.log(`Failed to create Order- ${err}`);
        res
          .status(401)
          .send({ success: false, message: "Error in creating order!" });
      });
  } catch (err) {
    console.log(`Failed to create Order- ${err}`);
    res
      .status(401)
      .send({ success: false, message: "Error in creating order!" });
  }
};

controller.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const canceledOrder = await Order.updateStatus(orderId, "Canceled");
    res.status(200).send({ success: true, result: canceledOrder.id });
  } catch (err) {
    console.log(`Failed to cancel Order- ${err}`);
    res.status(401).send({ message: "Error in canceling order!" });
  }
};

// check order status
controller.getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.getOrder(orderId);
    res.status(200).send({ success: true, result: order });
  } catch (err) {
    console.log(`Failed to get Order- ${err}`);
    res.status(401).send({ message: "Error in getting order!" });
  }
};

export default controller;
