import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";

const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await EmployeeService.save(req.body);
    res.status(201).send({ message: "Funcionário cadastrado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await EmployeeService.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const employeeController = { save, findAll };
