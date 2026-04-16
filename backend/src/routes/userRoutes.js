import express from 'express';
import {protectedRoute} from '../middleware/authMiddleware.js'; 
import { getRecommendedUser,getMyFriends, sendFriendRequest, acceptFriendRequest /*, rejectFriendRequest*/
 } from '../controllers/userController.js';


const router = express.Router();

router.use(protectedRoute); // Apply the protectedRoute middleware to all routes in this router

router.get('/recommended', getRecommendedUser);
router.get('/friends', getMyFriends);
router.post('/friend-request/:id', sendFriendRequest);
router.post('/friend-request/:id/accept', acceptFriendRequest);
// router.post('/friend-request/:id/reject', rejectFriendRequest);


export default router;