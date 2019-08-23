import express from 'express';
import SessionController from '../app/controllers/SessionController';

const router = express.Router();

/* GET users listing. */
router.post('/', SessionController.login);

export default router;
