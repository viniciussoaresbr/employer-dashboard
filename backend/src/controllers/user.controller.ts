import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.save(req.body);
    res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.findUserById(req.params.userId);
    const formattedData = {
      id: data?.id,
      name: data?.name,
      lastname: data?.lastname,
      email: data?.email,
    };
    res.status(200).send(formattedData);
  } catch (error) {
    next(error);
  }
};

export const userController = { save, findUserById };
