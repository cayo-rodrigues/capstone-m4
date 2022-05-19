import { Request, Response } from "express";
import CreateBillService from "../services/Bills/createBill.service";
import ListBillsService from "../services/Bills/listBills.service";

class BillsController {
  static async store(req: Request, res: Response) {
    const createdBill = await CreateBillService.execute();

    return res.status(201).json(createdBill);
  }

  static async index(req: Request, res: Response) {
    const bills = await ListBillsService.execute();

    return res.status(200).json(bills);
  }

  static async show(req: Request, res: Response) {}

  static async update(req: Request, res: Response) {}

  static async delete(req: Request, res: Response) {}
}

export default BillsController;
