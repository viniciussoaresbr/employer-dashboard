import multer from "multer";
import { v4 as idGenerator } from "uuid";
import path from "path";
import { NextFunction, Request, Response } from "express";

export const upload = (filepath: string, key: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = idGenerator();

    const storage = multer.diskStorage({
      destination: filepath,
      filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = id + ext;
        res.locals.avatar = fileName;
        cb(null, fileName);
      },
    });

    multer({ storage }).single(key)(req, res, next);
  };
};
