import React, { useEffect, useState } from "react";
import MessageList from "../MessageList/MessageList";
import MessageInput from "../MessageInput/MessageInput";
import socket from "../../services/socket";
import {jwtDecode} from "jwt-decode";

interface Message {
    sender: string;
    message: string;
}

interface Props {
    receiverId: string;
}

const ChatBox: React.FC<Props> = ({ receiverId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedId = localStorage.getItem("receiverId");
        setCurrentUserId(storedId);
    }, []);

    useEffect(() => {
        if (receiverId) {
            socket.emit("join", { receiverId });
        }

        socket.on("loadMessages", (loadedMessages: Message[]) => {
            setMessages(loadedMessages);
        });

        socket.on("receiveMessage", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("loadMessages");
            socket.off("receiveMessage");
        };
    }, [receiverId]);

    const handleSendMessage = (message: string) => {
        if (receiverId && message.trim()) {
            socket.emit("sendMessage", { receiverId, message });
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <MessageList messages={messages} />
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
};

export default ChatBox;
