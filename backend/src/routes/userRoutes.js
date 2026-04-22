import express from 'express';
import { getRecommendedUser,getMyFriends, sendFriendRequest, acceptFriendRequest ,getFriendRequests, getOutgoingFriendReqs
 } from '../controllers/userController.js';
import { protectedRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.use(protectedRoute); // Apply the protectedRoute middleware to all routes in this router

router.get('/recommended', getRecommendedUser);
router.get('/friends', getMyFriends);
router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept', acceptFriendRequest);
router.get('/friend-request',getFriendRequests); 
router.get('/outgoing-friend-requests', getOutgoingFriendReqs);


export default router;