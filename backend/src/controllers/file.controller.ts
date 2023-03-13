import { Request, Response } from "express";
import path from "path";

const uploadAvatar = (_req: Request, res: Response) => {
  res.json(res.locals.avatar);
};

const download = async (req: Request, res: Response) => {
  const id = req.params.id;

  return res.sendFile(path.resolve(__dirname, "..", "images", id));
};

export const fileController = { uploadAvatar, download };
