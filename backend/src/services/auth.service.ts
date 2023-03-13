import { prisma } from "../database/prisma";
import { IUserLogin } from "../interfaces";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { bodyValidation } from "../utils/body.validate";

const auth = async (userLogin: IUserLogin) => {
  const { email, password } = userLogin;

  const requiredKeys = ["email", "password"];

  bodyValidation<IUserLogin>(requiredKeys, userLogin);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new createError.NotFound("Usuário não cadastrado");
  }

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) throw new createError.Unauthorized("Senha inválida");

  const accessToken = jwt.sign(
    { userId: user.id, username: user.name },
    process.env.ACCESS_TOKEN_SECRET as jwt.Secret
  );

  return { userId: user.id, accessToken };
};

export const authService = { auth };
