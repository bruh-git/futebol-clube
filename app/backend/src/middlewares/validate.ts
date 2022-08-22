import * as Joi from 'joi';
import ILogin from '../interfaces/ILogin';

export default class ValidateLogin {
  static async validateBody(data: ILogin) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error } = schema.validate(data);

    if (error) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }
    return data;
  }
}
