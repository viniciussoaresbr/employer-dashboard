import createHttpError from "http-errors";

export const bodyValidation = <T extends object>(
  requiredkeys: string[],
  body: T
) => {
  const hasAllRequiredKeys = requiredkeys.every(key => key in body);

  const missingKeys = requiredkeys.filter(key => !(key in body)).join(", ");

  if (!hasAllRequiredKeys) {
    throw new createHttpError.BadRequest(
      `Chaves obrigatórias no corpo da requisição: ${missingKeys}`
    );
  }
};
