import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_Secret } from "./config";

// export interface RequsetCustom extends Request {
//   userId: string;
// }

export const userMiddelware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  const decode = jwt.verify(header as string, JWT_Secret);

  if (decode) {
    // @ts-ignore
    req.userId = decode.id;

    next();
  } else {
    res.status(403).json({
      message: "You are not logged in ",
    });
  }
};

// Ovverride the type of express object
