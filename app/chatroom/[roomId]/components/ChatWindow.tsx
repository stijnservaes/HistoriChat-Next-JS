"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import {
  Alert,
  Box,
  Button,
  Fade,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { redirect } from "next/navigation";
import { ChatMessage } from "../page";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({
  roomId,
  initialMessages,
}: {
  roomId: number;
  initialMessages: ChatMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [socket, setSocket] = useState(null as Socket | null);
  const [error, setError] = useState({ success: true, message: "test" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [exceedToken, setExceedToken] = useState({
    exceeds: false,
    message: "test",
  });
  const [inputMessage, setInputMessage] = useState("");
  const chatWindow = useRef<HTMLDivElement | null>(null);

  const { getToken } = useAuth();
  const { user } = useUser();

  function handleSend() {
    if (!socket) return;

    if (inputMessage) {
      setIsSending(true);
      socket.emit("chat", { roomId: roomId, message: inputMessage });
      setInputMessage("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  useEffect(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    let newSocket: Socket | null = null;

    async function connectAndJoin() {
      const token = await getToken();

      newSocket = io("ws://localhost:3001", {
        auth: {
          token: token,
        },
      });

      setSocket(newSocket);
    }

    connectAndJoin();

    return () => {
      newSocket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinroom", roomId);

    socket.on("joinroom", (payload: { success: boolean; message: string }) => {
      if (payload.success) {
        setIsLoading(true);
      }
    });

    socket.on("connect_error", (error) => {
      setIsLoading(true);
      setError({ success: false, message: error.message });
    });

    socket.on("error", (error) => {
      setIsLoading(true);
      setError({ success: false, message: error.message });
    });

    socket.on("chat", (payload: { success: boolean; message: ChatMessage }) => {
      setMessages((prev) => [...prev, payload.message]);
      setIsSending(false);
    });

    socket.on("no_tokens", (msg: string) => {
      setExceedToken({ exceeds: true, message: msg });
      setIsSending(false);
    });

    return () => {
      socket.off("joinroom");
      socket.off("connect_error");
      socket.off("error");
      socket.off("chat");
      socket.off("no_tokens");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Stack direction="column" gap={2} sx={{ height: "100%", padding: 2 }}>
      {exceedToken.exceeds && (
        <Fade in={true}>
          <Alert
            variant="standard"
            severity="warning"
            sx={{
              position: "fixed",
              top: "20vh",
              left: "50vw",
              transform: "translateX(-50%)",
            }}
          >
            {exceedToken.message}
          </Alert>
        </Fade>
      )}
      {!error.success ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Alert variant="outlined" severity="error">
            {error.message}
          </Alert>
          <Button variant="outlined" onClick={() => redirect("/chatroom")}>
            Return to choose
          </Button>
        </Box>
      ) : !isLoading ? (
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
          <Typography variant="subtitle1" color="textSecondary">
            Joining room...
          </Typography>
        </Stack>
      ) : (
        <>
          <Paper
            ref={chatWindow}
            elevation={1}
            sx={{
              flexGrow: 1,
              padding: 3,
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {messages.map((message) => (
              <ChatBubble
                textMessage={message}
                key={message._id}
                isFromUser={user?.username === message.byUser}
              />
            ))}
          </Paper>
          <Stack direction="row">
            {isSending ? (
              <Box sx={{ marginX: "auto", marginTop: 1 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: -2,
                    marginRight: 1
                  }}
                >
                  <IconButton onClick={() => redirect("/chatroom")}>
                    <NoMeetingRoomIcon />
                  </IconButton>
                </Box>
                <TextField
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  id="new-message"
                  label="Send message"
                  variant="outlined"
                  sx={{ flexGrow: 1 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 2,
                  }}
                >
                  <IconButton onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}
