import {StreamChat} from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("Stream API key and secret must be set in environment variables.")
}

const chatClient= StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser=async(userData)=>{
    try {
       await chatClient.upsertUser(userData)
       return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
}
//todo
export const generateStreamToken=(userId)=>{
try {
    const userIdStr=userId.toString();
    const token= chatClient.createToken(userIdStr);
    return token;
} catch (error) {
    console.error("Error generating Stream token:", error);
    
}
}