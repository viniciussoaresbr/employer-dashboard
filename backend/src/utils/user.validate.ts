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

export const passwordValidation = (value: string) => {
  const haveUpperCase = /[A-Z]/.test(value);
  const haveLowerCase = /[a-z]/.test(value);
  const haveNumber = /[0-9]/.test(value);
  const minMaxChar = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(value);

  const isPasswordValid =
    haveUpperCase && haveLowerCase && haveNumber && minMaxChar;

  if (!isPasswordValid) {
    throw new createHttpError.BadRequest(
      "A senha deve conter pelo menos 8 caracteres, no máximo 18 caracteres, letra maiúscula, letra minúscula, e um número"
    );
  }
};
