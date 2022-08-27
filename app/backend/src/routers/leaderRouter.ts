import * as express from 'express';
import LeaderController from '../controllers/leaderboardsController';
import LeaderService from '../services/Leaderboards';

const router = express.Router();

const leaderService = new LeaderService();
const leaderController = new LeaderController(leaderService);

router.get('/', (req, res) => leaderController.list(req, res));
router.get('/home', (req, res) => leaderController.listHome(req, res));
router.get('/away', (req, res) => leaderController.listAway(req, res));

export default router;
