import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSenha = process.env.JWT_SECRET || 'minhaSenha';

export default class AuthService {
  static createToken(payload: { email: string, password: string }) {
    const token = jwt.sign(payload, jwtSenha);
    return token;
  }
}
