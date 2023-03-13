import createHttpError from "http-errors";
import { prisma } from "../database/prisma";
import { IEmployee } from "../interfaces";
import { cepValidation, cpfValidation } from "../utils/employee.validate";
import { emailValidation } from "../utils/user.validate";

const save = async (employeeBody: IEmployee) => {
  const employeeExists = await prisma.employee.findUnique({
    where: {
      email: employeeBody.email,
    },
  });

  if (employeeExists)
    throw new createHttpError.Conflict("E-mail já foi cadastrado");

  emailValidation(employeeBody.email);
  cpfValidation(employeeBody.cpf);
  cepValidation(employeeBody.cep);

  const employee = await prisma.employee.create({
    data: {
      ...employeeBody,
    },
  });
  return employee;
};

const findAll = () => {
  return prisma.employee.findMany();
};

export const EmployeeService = { save, findAll };
