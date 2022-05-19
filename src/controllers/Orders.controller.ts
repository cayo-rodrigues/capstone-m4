import { Request, Response } from "express";
import CreateOrderService from "../services/Orders/createOrder.service";

class OrdersController {
  static async store(req: Request, res: Response) {
    const createdOrder = await CreateOrderService.execute(req.body);

    return res.status(201).json(createdOrder);
  }

  static async index(req: Request, res: Response) {}

  static async show(req: Request, res: Response) {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}

  static async userOrders(req: Request, res: Response) {}

  static async pendingOrders(req: Request, res: Response) {}

  static async readyOrders(req: Request, res: Response) {}
}

export default OrdersController;
