import createHttpError from "http-errors";

export const emailValidation = (value: string) => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    );
  if (!isEmailValid) {
    throw new createHttpError.BadRequest(
      "E-mail digitado não existe ou é inválido"
    );
  }
};

export const cepValidation = (value: string) => {
  const isCepValid = /^\d{5}-?\d{3}$/.test(value);

  if (!isCepValid) {
    throw new createHttpError.BadRequest("CEP digitado não é válido");
  }
};

export const cpfValidation = (value: string) => {
  const isCpfValid = /^\d{3}([.-]?\d{3}){2}-?\d{2}$/.test(value);

  if (!isCpfValid) {
    throw new createHttpError.BadRequest("Cpf digitado não é válido");
  }
};
