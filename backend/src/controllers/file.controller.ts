import { NextFunction, Request, Response } from "express";
import path from "path";

const uploadAvatar = (_req: Request, res: Response, _next: NextFunction) => {
  res.json(res.locals.avatar);
};

const download = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  return res.sendFile(path.resolve(__dirname, "..", "images", id), (err) => {
    if (err) {
      next(err);
    }
  });
};

export const fileController = { uploadAvatar, download };
