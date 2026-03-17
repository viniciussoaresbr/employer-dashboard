import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IRequest, IUserRequest } from "../interfaces";
import createError from "http-errors";

export const authToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(new createError.Forbidden("Token de acesso é obrigatório"));
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(new createError.Forbidden("Formato de token inválido"));
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
    (error, user) => {
      if (error) {
        return next(new createError.Forbidden("Token de acesso inválido"));
      }
      req.user = user as IUserRequest;
      req.userId = (user as IUserRequest).userId;
      next();
    }
  );
};
