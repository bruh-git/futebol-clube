import * as express from 'express';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const router = express.Router();

router.post('/', (req, res) => loginController.login(req, res));

export default router;
