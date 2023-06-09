import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import AuthService from './AuthService';

// - Endpoint `POST /users` deve retornar:
//     - token

export default class LoginService {
  public validateBody = (data: object) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }

    return value as { email: string, password: string };
  };

  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const token = AuthService.createToken({ email, password });

    return token;
  };

  static async validateLogin(token: string) {
    const { email } = AuthService.validateToken(token);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const e = new Error('unidentified user');
      e.name = 'UnauthorizedError';
      throw e;
    }
    return user.role;
  }
}
