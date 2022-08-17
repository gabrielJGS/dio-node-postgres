import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const usersRoute = Router();

usersRoute.get("/users", jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRoute.get("/users/:id", jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await userRepository.findById(Number(id));
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;
    const id = await userRepository.create(newUser);

    res.status(StatusCodes.CREATED).json(id);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

usersRoute.put(
  "/users/:id",
  jwtAuthenticationMiddleware,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const modifiedUser = req.body;
      modifiedUser.id = id;

      await userRepository.update(modifiedUser);

      res.status(StatusCodes.OK).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

usersRoute.delete(
  "/users/:id",
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await userRepository.remove(Number(id));
      res.status(StatusCodes.OK).send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default usersRoute;
