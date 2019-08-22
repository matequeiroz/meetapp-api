import express from 'express';
import User from '../app/models/User';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  res.status(200).json({ server: 'running' });
});

export default router;
