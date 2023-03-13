import { Request } from "express";

export interface IPost {
  text: string;
  author: IUser;
  authorId: number;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  name: string;
  lastname: string;
  posts?: IPost[];
}

export interface IUserRequest {
  userId: number;
  username: string;
}

export interface IRequest extends Request {
  user?: IUserRequest;
}

export interface IEmployee {
  avatar: string;
  status: "Ativo" | "Inativo";
  name: string;
  email: string;
  date: Date;
  cpf: string;
  street: string;
  cep: string;
  district: string;
  city: string;
  state: string;
}
