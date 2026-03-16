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

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await EmployeeService.findAll();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await EmployeeService.update(id, req.body);
    res.status(200).send({ message: "Funcionário atualizado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await EmployeeService.deleteById(id);
    res.status(200).send({ message: "Funcionário excluído com sucesso" });
  } catch (error) {
    next(error);
  }
};

export const employeeController = { save, findAll, update, deleteById };
