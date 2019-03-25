import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    state: String,
  },
  { collection: 'Order' }
);

const OrdersModel = mongoose.model('Order', OrderSchema);

OrdersModel.getOrder = (orderId) => {
  return OrdersModel.findOne({ _id: orderId });
};

OrdersModel.createOrder = (orderToCreate) => {
  return orderToCreate.save();
};

OrdersModel.updateStatus = (orderId, state) => {
  return OrdersModel.findOneAndUpdate({ _id: orderId }, { state });
};

export default OrdersModel;
