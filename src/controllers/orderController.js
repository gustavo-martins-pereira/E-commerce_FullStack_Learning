import { createOrderUseCase } from "../services/order/createOrderUsecase.js";
import { createOrderItemUsecase } from "../services/orderItem/createOrderItemUsecase.js";
import CustomError from "../utils/errors/customError.js";

async function createOrder(request, response) {
    try {
        const {
            total,
            status,
            clientId,
            sellerId,
            orderItems,
        } = request.body;

        const order = await createOrderUseCase({ total, status, clientId, sellerId });
        
        const createdOrderItems = await Promise.all(
            orderItems.map(async orderItem => await createOrderItemUsecase({
                quantity: orderItem.quantity,
                price: orderItem.price,
                subtotal: orderItem.subtotal,
                orderId: order.id,
                productId: orderItem.productId,
            }))
        );

        return response.status(201).json({ order, createdOrderItems });
    } catch(error) {
        return response.status(error instanceof CustomError ? error.statusCode : 500).json({ error: error.message});
    }
}

export {
    createOrder,
};
