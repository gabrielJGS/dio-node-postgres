import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.model";
import ForbiddenError from "../models/errors/forbidden.error.model";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.send(error).status(StatusCodes.BAD_REQUEST);
  } else if (error instanceof ForbiddenError) {
    res.send(error).status(StatusCodes.FORBIDDEN);
  } else {
    res.send(error).status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

}

export default errorHandler;
