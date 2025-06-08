import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io("https://intelligent-shockley-8ynjnlm8e.liara.run", {
    auth: { token },
});

export default socket;
