export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserSignUp extends IUserSignIn {
  name: string;
  lastname: string;
}

export interface ISignUpInputs extends IUserSignUp {
  confirmPassword?: string;
}

export interface IUserById {
  id: string;
  name: string;
  lastname: string;
  email: string;
}
