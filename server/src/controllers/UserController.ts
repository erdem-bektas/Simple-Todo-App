import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import UserService from '../services/UserService';
import ErrorHandler from '../middlewares/ErrorHandler';

class UserController {
  constructor(private userService: UserService) { }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const result = await this.userService.register(email, password);
      res.status(201).send(result);
    } catch (error) {
      ErrorHandler.handleErrors(error, req, res, next);
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const result = await this.userService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      ErrorHandler.handleErrors(error, req, res, next);
    }
  }

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { refreshToken } = req.body;

    try {
      const result = await this.userService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error) {
      ErrorHandler.handleErrors(error, req, res, next);
    }
  }
}

const userService = new UserService();
const userController = new UserController(userService);

export default userController;
