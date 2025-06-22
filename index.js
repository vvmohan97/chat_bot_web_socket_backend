import express from "express";
import http from "http";

import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(http);

app.use(cors());
app.get("/", (req, res) => {
  console.log(res, "dataaaaaa");
  res.send("welcome");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on("userMessage", (msg) => {
    console.log(socket.id, msg, "qwerty");

    if (!msg || typeof msg !== "string") return;
    const cleanedMsg = msg.trim().toLowerCase();
    let reply = "I'm still learning—could you explain that a bit differently?";
    if (
      cleanedMsg.includes("hi") ||
      cleanedMsg.includes("hello") ||
      cleanedMsg.includes("welcome")
    ) {
      reply =
        "👋 Hey there! I'm Mohan, your AI buddy. What can I do for you today?";
    } else if (cleanedMsg.includes("contact")) {
      reply = `vvmohan.vsr@gmail.com \n  Ph:+91-9524244117 `;
    } else if (cleanedMsg.includes("email")) {
      reply = "vvmohan.vsr@gmail.com";
    } else if (
      cleanedMsg.includes("number") ||
      cleanedMsg.includes("mobile") ||
      cleanedMsg.includes("phone")
    ) {
      reply = "vvmohan.vsr@gmail.com";
    } else if (cleanedMsg.includes("instagram")) {
      reply =
        "https://www.instagram.com/call_me_v.v.mohan?igsh=MTBudm5sYjZ4Ym1taA==";
    } else if (cleanedMsg.includes("linkedin")) {
      reply = "https://www.linkedin.com/in/vvmohankumar-vv/";
    } else if (cleanedMsg.includes("github")) {
      reply = "https://github.com/vvmohan97";
    }

    socket.emit("botReply", reply);
  });

  socket.on("disconnect", () => {
    console.log("socket diconnected");
  });
  socket.on("error", (err) => {
    console.log(err);
  });


  
});


const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
