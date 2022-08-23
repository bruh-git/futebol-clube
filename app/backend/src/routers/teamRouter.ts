import * as express from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamsService';

const router = express.Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.get('/', (req, res) => teamController.list(req, res));
router.get('/:id', (req, res) => teamController.findById(req, res));

export default router;
