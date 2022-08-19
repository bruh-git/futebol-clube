import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';

// - Endpoint `POST /users` deve retornar:
//     - token

export default class LoginService {
  static validateBody(data: object) {
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
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    const sucessLoginPassword = !!user && await bcrypt.compare(password, user.password);

    if (!sucessLoginPassword) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }
    return user;
  }
}
