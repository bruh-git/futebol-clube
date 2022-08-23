import * as express from 'express';
import MatchesController from '../controllers/matchController';
import MatchesService from '../services/matchesService';

const router = express.Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', (req, res) => matchesController.list(req, res));

export default router;
