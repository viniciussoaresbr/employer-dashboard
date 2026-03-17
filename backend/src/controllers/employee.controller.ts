import { NextFunction, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { IRequest } from "../interfaces";

const save = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId as string;
    await EmployeeService.save(req.body, userId);
    res.status(201).send({ message: "Funcionário cadastrado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId as string;
    const data = await EmployeeService.findAll(userId);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;
    await EmployeeService.update(id, req.body, userId);
    res.status(200).send({ message: "Funcionário atualizado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.userId as string;
    await EmployeeService.deleteById(id, userId);
    res.status(200).send({ message: "Funcionário excluído com sucesso" });
  } catch (error) {
    next(error);
  }
};

export const employeeController = { save, findAll, update, deleteById };
