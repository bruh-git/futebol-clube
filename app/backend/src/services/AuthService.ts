import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export default class AuthService {
  static createToken(payload: { email: string, password: string }) {
    const token = jwt.sign(payload, secret);
    return token;
  }

  static validateToken(token: string) {
    const user = jwt.verify(token, secret);
    return user as { email: string, password: string };
  }
}
