import React from "react";
import styles from "./MessageList.module.scss";

interface Message {
    sender: string;
    message: string;
}

interface Props {
    messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
    const currentUser: any = localStorage.getItem("receiverId");

    return (
        <div className={styles.container}>
            {messages.map((msg, index) => {
                const isSentByCurrentUser = msg.sender === currentUser;
                return (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            isSentByCurrentUser ? styles.sent : styles.received
                        }`}
                    >
                        <span className={styles.text}>{msg.message}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
