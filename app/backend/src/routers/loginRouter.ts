import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginController = new LoginController();

const router = Router();

router.post('/', (req, res) => loginController.login(req, res));
router.get('/validate', (req, res) => loginController.validateLogin(req, res));

export default router;
