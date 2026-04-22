import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware';
import { getStreamToken } from '../controllers/chatController';

const router = express.Router();


router.get('/token', protectedRoute, getStreamToken);

export default router;
