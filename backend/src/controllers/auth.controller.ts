import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.auth(req.body);
    res.send(data);
  } catch (error) {
    next(error);
  }
};

export const authController = { auth };
