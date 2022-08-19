import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import AuthService from '../services/AuthService';

export default class LoginController {
  constructor(
    private _login: typeof LoginService = LoginService,
    private _authentication: typeof AuthService = AuthService,
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = this._login.validateBody(req.body);
    const user = await this._login.login(email, password);

    res.status(200).json({ token: this._authentication.createToken(user) });
  }

  async validateLogin(req: Request, res: Response) {
    const token = req.headers.authorization;
    const payload = this._authentication.verifyToken(token);

    res.status(200).json({ role: payload });
  }
}
