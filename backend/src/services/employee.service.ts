import createHttpError from "http-errors";
import { prisma } from "../database/prisma";
import { IEmployee } from "../interfaces";
import { cepValidation, cpfValidation } from "../utils/employee.validate";
import { emailValidation } from "../utils/user.validate";

const save = async (employeeBody: IEmployee, userId: string) => {
  const employeeExists = await prisma.employee.findFirst({
    where: {
      userId,
      email: employeeBody.email,
    },
  });

  if (employeeExists)
    throw new createHttpError.BadRequest("E-mail já foi cadastrado");

  const cpfExists = await prisma.employee.findFirst({
    where: {
      userId,
      cpf: employeeBody.cpf,
    },
  });

  if (cpfExists) throw new createHttpError.BadRequest("Cpf já foi cadastrado");

  emailValidation(employeeBody.email);
  cpfValidation(employeeBody.cpf);
  cepValidation(employeeBody.cep);

  const { id: _, userId: __, ...data } = employeeBody;

  const employee = await prisma.employee.create({
    data: {
      ...data,
      userId,
    },
  });
  return employee;
};

const findAll = (userId: string) => {
  return prisma.employee.findMany({
    where: {
      userId,
    },
  });
};

const update = async (id: string, employeeBody: IEmployee, userId: string) => {
  const employeeExists = await prisma.employee.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!employeeExists)
    throw new createHttpError.NotFound("Funcionário não encontrado");

  if (employeeBody.email !== employeeExists.email) {
    const emailExists = await prisma.employee.findFirst({
      where: {
        userId,
        email: employeeBody.email,
      },
    });
    if (emailExists)
      throw new createHttpError.BadRequest("E-mail já foi cadastrado");
  }

  if (employeeBody.cpf !== employeeExists.cpf) {
    const cpfExists = await prisma.employee.findFirst({
      where: {
        userId,
        cpf: employeeBody.cpf,
      },
    });
    if (cpfExists)
      throw new createHttpError.BadRequest("Cpf já foi cadastrado");
  }

  emailValidation(employeeBody.email);
  cpfValidation(employeeBody.cpf);
  cepValidation(employeeBody.cep);

  const { id: _, userId: __, ...updateData } = employeeBody;

  const employee = await prisma.employee.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return employee;
};

const deleteById = async (id: string, userId: string) => {
  const employeeExists = await prisma.employee.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!employeeExists)
    throw new createHttpError.NotFound("Funcionário não encontrado");

  await prisma.employee.delete({
    where: {
      id,
    },
  });
};

export const EmployeeService = { save, findAll, update, deleteById };
