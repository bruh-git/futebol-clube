import * as express from 'express';
import MatchesController from '../controllers/matchController';
import MatchesService from '../services/matchesService';

const router = express.Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', (req, res) => matchesController.list(req, res));
router.post('/', (req, res) => matchesController.create(req, res));
router.get('/?', (req, res) => matchesController.list(req, res));
router.patch('/:id/finish', (req, res) => matchesController.finish(req, res));
router.patch('/:id', (req, res) => matchesController.update(req, res));

export default router;
