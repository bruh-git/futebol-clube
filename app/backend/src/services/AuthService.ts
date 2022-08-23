import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export default class AuthService {
  static createToken(payload: { email: string, password: string }) {
    const token = jwt.sign(payload, secret);
    return token;
  }

  static validateToken(token: string): jwt.JwtPayload {
    try {
      const verify = jwt.verify(token, secret);
      return verify as jwt.JwtPayload;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
  }
}
