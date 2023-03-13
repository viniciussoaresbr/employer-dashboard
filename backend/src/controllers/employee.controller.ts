import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { httpErrorsStatus } from "../utils/errors.status";

const save = async (req: Request, res: Response) => {
  try {
    await EmployeeService.save(req.body);
    res.status(201).send({ message: "Funcionário cadastrado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      const statusCode =
        httpErrorsStatus[error.name as keyof typeof httpErrorsStatus];
      res.status(statusCode || 500).send({ message: error.message });
    }
  }
};

const findAll = async (req: Request, res: Response) => {
  try {
    const data = await EmployeeService.findAll();
    res.status(200).send(data);
  } catch (error) {
    res
      .status(httpErrorsStatus.BadRequestError)
      .send({ message: "Não foi possível exibir os funcionários" });
  }
};

export const employeeController = { save, findAll };
