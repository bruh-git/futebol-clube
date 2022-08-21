import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(
    private _loginService: LoginService,
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = this._loginService.validateBody(req.body);
    const token = await this._loginService.login(email, password);

    res.status(200).json({ token });
  }
}
