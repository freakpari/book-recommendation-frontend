import notification from "./icon/Notification.svg";
import chat from "./icon/chat.svg";
import SearchNav from "../../components/SearchNav/SearchNav";
import Footer from "../../components/Footer/Footer";
import userProfile from "./icon/profile.svg";
import { useState, useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import socket from "../../services/socket";
import styles from "./chatpage.module.scss";

export default function Chatpage () {
  const [receiverId, setReceiverId] = useState<string | null>("");
  const [chatPartners, setChatPartners] = useState<string[]>([]);
  // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAxNjcsImlhdCI6MTc0OTMxODExNywiZXhwIjoxNzQ5NDkwOTE3fQ.GfxUj4CpLbXSuxi5-aE72KoTofrv2fXFK3NJsEoJaxw");
  useEffect(() => {
    setReceiverId(localStorage.getItem("receiverId"));
    socket.emit("getChatPartners");

    socket.on("chatPartners", (partners: string[]) => {
      setChatPartners(partners);
    });

    return () => {
      socket.off("chatPartners");
    };
  }, []);

  const handleSelectPartner = (partnerId: string) => {
    setReceiverId(partnerId);
    localStorage.setItem("receiverId", partnerId);
    socket.emit("join", { receiverId: partnerId });
  };

  return (
      <div className={styles.container}>

        <SearchNav />

        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <div className={styles.contacts}>
              <ChatSidebar
                  chatPartners={chatPartners}
                  onSelect={handleSelectPartner}
                  selectedId={receiverId}
              />
            </div>

            <div className={styles.chatBox}>
              {receiverId ? (
                  <ChatBox receiverId={receiverId} />
              ) : (
                  <p>برای شروع چت، یک کاربر را انتخاب کنید</p>
              )}

            </div>
          </div>
        </div>

        <Footer />
      </div>

  )
}

