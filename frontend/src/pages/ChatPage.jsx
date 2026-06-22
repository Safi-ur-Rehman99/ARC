import React from 'react'
import ChatLoader from '../components/ChatLoader'
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageComposer,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import useAuthUser from '../hook/useAuthUser';
import CallButton from '../components/CallButton';

const ChatPage = () => {

  const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

  const { id: targetUserId } = useParams()
  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthUser()

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser
  })

  useEffect(() => {

    const initChat = async () => {
      if (!tokenData?.token || !authUser) return
      try {
        console.log("init chat")
        const client = StreamChat.getInstance(STREAM_API_KEY)
        client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic
        }, tokenData.token)

        const channelId = [authUser._id, targetUserId].sort().join("-")

        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId]
        })
        await currentChannel.watch()
        setChannel(currentChannel)
        setChatClient(client)
      }
      catch (error) {
        console.error("Error initializing chat client", error)
        toast.error("Could not Connect to chat service. Please try again.")
      }
      finally {
        setLoading(false)
      }
    }

    initChat()
  }, [tokenData, authUser, targetUserId])

  if (loading || !chatClient || !channel) return <ChatLoader />

  const handleVideoCall = () => {
    const callUrl = `${window.location.origin}/call/${channel.id}`;

    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });

    toast.success("Video call link sent successfully!");
  }

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient} theme="str-chat__theme-light">
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageComposer focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
