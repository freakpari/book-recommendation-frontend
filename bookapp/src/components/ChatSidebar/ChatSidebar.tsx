import React, { useEffect, useState } from "react";
import styles from "./ChatSidebar.module.scss";
import axios from "axios";
import defaultUser from "./icons/defaultUser.svg";

interface Props {
    chatPartners: string[];
    onSelect: (partnerId: string) => void;
    selectedId: string | null;
}

interface UserInformation {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    bio: string;
    mbti: string;
}

const ChatSidebar: React.FC<Props> = ({ chatPartners, onSelect, selectedId }) => {
    const [profileImages, setProfileImages] = useState<Record<string, string>>({});
    const [userNames, setUserNames] = useState<Record<string, string>>({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || chatPartners.length === 0) return;

        const fetchAllData = async () => {
            const newImages: Record<string, string> = {};
            const newNames: Record<string, string> = {};

            await Promise.all(
                chatPartners.map(async (partnerId) => {
                    // Fetch profile picture
                    try {
                        const imgResponse = await axios.get(
                            `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profilePic/${partnerId}`,
                            { responseType: "blob" }
                        );
                        if (imgResponse.status !== 204) {
                            const imageURL = URL.createObjectURL(imgResponse.data);
                            newImages[partnerId] = imageURL;
                        } else {
                            newImages[partnerId] = defaultUser;
                        }
                    } catch (error) {
                        console.error(`خطا در دریافت عکس برای ${partnerId}`, error);
                        newImages[partnerId] = defaultUser;
                    }

                    // Fetch user name
                    try {
                        const infoResponse = await axios.get<{ message: string; user: UserInformation }>(
                            `https://intelligent-shockley-8ynjnlm8e.liara.run/api/auth/profile-another-user/?userid=${partnerId}`,
                            { timeout: 10000 }
                        );
                        const user = infoResponse.data.user;
                        const fullName = user.first_name + (user.last_name ? " " + user.last_name : "");
                        newNames[partnerId] = fullName;
                    } catch (error) {
                        console.error(`خطا در دریافت اطلاعات برای ${partnerId}`, error);
                        newNames[partnerId] = "نامشخص";
                    }
                })
            );

            setProfileImages(newImages);
            setUserNames(newNames);
        };

        fetchAllData();
    }, [chatPartners]);

    return (
        <div>
            {chatPartners.map((partnerId) => (
                <div
                    key={partnerId}
                    onClick={() => onSelect(partnerId)}
                    className={`${styles.chatSide} ${partnerId === selectedId ? styles.selected : ""}`}
                >
                    <img
                        src={profileImages[partnerId] || defaultUser}
                        alt="عکس کاربر"
                    />
                    <div>{userNames[partnerId] || "در حال بارگذاری..."}</div>
                </div>
            ))}
        </div>
    );
};

export default ChatSidebar;
