import { NextFunction, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { IRequest, IUserRequest } from "../interfaces";
import { httpErrorsStatus } from "../utils/errors.status";

export const authToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(httpErrorsStatus.ForbiddenError)
      .send({ message: "Token de acesso é obrigatório" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(httpErrorsStatus.ForbiddenError)
      .send({ message: "Formato de token inválido" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
    (error, user) => {
      if (error) {
        return res
          .status(httpErrorsStatus.ForbiddenError)
          .send({ message: "Token de acesso inválido" });
      }
      req.user = user as IUserRequest;
      next();
    }
  );
};
