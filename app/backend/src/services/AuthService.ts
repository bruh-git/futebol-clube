import * as jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default class AuthService {
  static createToken(user: User) {
    const { id, role } = user;
    const token = jwt.sign({ id, role }, JWT_SECRET, {
      expiresIn: '5d',
      algorithm: 'HS256',
    });

    return token;
  }

  static verifyToken(token?: string) {
    if (!token) {
      const e = new Error('Invalid token');
      e.name = 'UnauthorizedError';
      throw e;
    }

    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      const e = new Error('Invalid token');
      e.name = 'UnauthorizedError';
      throw e;
    }
  }
}
