import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isHttpError(error)) {
    return res.status(error.status || error.statusCode).send({
      message: error.message,
    });
  }

  // Handle Prisma errors
  if (error.name?.startsWith("PrismaClient")) {
    console.error("Prisma Error:", error.message);

    // Connection or database-level errors are typically 500
    if (
      error.name === "PrismaClientInitializationError" ||
      error.name === "PrismaClientRustPanicError"
    ) {
      return res.status(500).send({
        message:
          "Erro de conexão com o banco de dados. Tente novamente mais tarde.",
      });
    }

    // Known or validation errors are typically 400
    return res.status(400).send({
      message:
        "Erro no processamento dos dados. Verifique as informações enviadas.",
    });
  }

  // Fallback for any other unexpected errors
  console.error("Unexpected error:", error);
  return res.status(500).send({
    message: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
  });
};
