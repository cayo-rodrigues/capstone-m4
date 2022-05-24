import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IGeneralFeedback } from "../interfaces/GeneralFeedback.interface";
import CreateGeneralFeedbackService from "../services/GeneralFeedbacks/CreateFeedback.service";
import DeleteGeneralFeedbackService from "../services/GeneralFeedbacks/DeleteGeneralFeedback.service";
import ListGeneralFeedbackService from "../services/GeneralFeedbacks/ListGeneralFeedbacks.service";
import ShowGeneralFeedbackService from "../services/GeneralFeedbacks/ShowGeneralFeedback.service";
import UpdateGeneralFeedbackService from "../services/GeneralFeedbacks/UpdateGeneralFeedback.service";

class GeneralFeedbackController {
  static async store(req: Request, res: Response) {
    const { description, rating }: IGeneralFeedback = req.body;

    const newFeedback = await CreateGeneralFeedbackService.execute({
      description,
      rating,
    });

    return res.status(201).json({
      message: "General feedback created",
      feedback: instanceToPlain(newFeedback),
    });
  }

  static async index(req: Request, res: Response) {
    const feedbacks = await ListGeneralFeedbackService.execute();

    return res.json(instanceToPlain(feedbacks));
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const feedback = await ShowGeneralFeedbackService.execute(id);

    return res.json(instanceToPlain(feedback));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description, rating }: IGeneralFeedback = req.body;

    const updatedFeedback = await UpdateGeneralFeedbackService.execute(id, {
      description,
      rating,
    });

    return res.json({
      message: "General feedback updated",
      feedback: instanceToPlain(updatedFeedback),
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await DeleteGeneralFeedbackService.execute(id);

    return res.status(204).json();
  }
}

export default GeneralFeedbackController;
