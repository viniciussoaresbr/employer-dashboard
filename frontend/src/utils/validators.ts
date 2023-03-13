import { ISignUpInputs } from '../types/user';

export const validatingEmail = (value: string) => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value,
    );
  const emailInvalidError = 'E-mail digitado não existe ou é inválido';
  return isEmailValid || emailInvalidError;
};

export const validatingPassword = (value: string) => {
  const haveUpperCase = /[A-Z]/.test(value);
  const haveLowerCase = /[a-z]/.test(value);
  const haveNumber = /[0-9]/.test(value);

  const isPasswordValid = haveUpperCase && haveLowerCase && haveNumber;
  const passwordInvalidError = `A senha deve conter ${
    !haveUpperCase
      ? 'letra maiúscula'
      : !haveLowerCase
      ? 'letra minúscula'
      : !haveNumber && 'um número'
  }`;
  return isPasswordValid || passwordInvalidError;
};

export const confirmingPassword = (
  value?: string,
  formValues?: ISignUpInputs,
) => {
  const passwordConfirmed = formValues?.password === value;
  const passwordNotConfirmedError =
    'Senha diferente da senha digitada anteriormente';

  return passwordConfirmed || passwordNotConfirmedError;
};

export const validatingCep = (value: string) => {
  const isCepValid = /^\d{5}-?\d{3}$/.test(value);
  const cepInvalidError = 'CEP digitado não é válido';

  return isCepValid || cepInvalidError;
};

export const validatingCpf = (value: string) => {
  const isCpfValid = /^\d{3}([.-]?\d{3}){2}-?\d{2}$/.test(value);
  const cepInvalidError = 'Cpf digitado não é válido';

  return isCpfValid || cepInvalidError;
};
