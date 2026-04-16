export async function getRecommendedUser(req, res) {

    try {
        const currentUserId = req.user.id;
        const currentUser= req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id: { $ne:currentUserId }}, // Exclude the current user
                {$id: {$nin: currentUser.friends }}, // Exclude users who are already friends
                {isOnboarded: true}, // Only include users who are onboarded
            ]
        });

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export async function getMyFriends(req,res) {
    try {
        const user= await User.findById(req.user.id).select('friends').populate('friends','fullName profilePicture nativeLanguage learningLanguage');

        res.status(200).json(user.friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

export async function sendFriendRequest(req,res) {
    try {
        const myId= req.user.id;
        const recipientId= req.params.id;

        if(myId === recipientId){
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }
        const recipient= await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({ message: "Recipient not found" });
        }
        const existingRequest= await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });
        if(existingRequest){
            return res.status(400).json({ message: "Friend request already sent" });
        }
        const friendRequest= new FriendRequest({
            sender: myId,
            recipient: recipientId,
        });
        await friendRequest.save();
        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });

    }
} 

export async function acceptFriendRequest(req,res) {
    try {
        const requestId= req.user.id;

        const friendRequest= await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({ message: "Friend request not found" });
        }
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }
        friendRequest.status= "accepted";
        await friendRequest.save();

        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet: { friends: friendRequest.recipient }
        }
        );
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet: { friends: friendRequest.sender }
        }
    );
    res.status(200).json({ message: "Friend request accepted successfully" });

    } catch (error) {   

        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}