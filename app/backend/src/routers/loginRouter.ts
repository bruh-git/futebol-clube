import * as express from 'express';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';

const router = express.Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', (req, res) => loginController.login(req, res));

export default router;
