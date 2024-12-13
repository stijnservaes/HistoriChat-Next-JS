import { Card, CardContent, Tooltip, Typography } from "@mui/material";
import { ChatMessage } from "../page";

export default function ChatBubble({textMessage, isFromUser}: {textMessage: ChatMessage, isFromUser: boolean}) {
  return (
    <Card
      sx={{
        width: "max-content",
        marginBottom: 2,
        maxWidth: "80%",
        backgroundColor: isFromUser ? "primary.main" : "secondary.main",
        marginLeft: isFromUser ? "auto" : "",
      }}
    >
      <Tooltip title={new Date(textMessage.createdAt).toLocaleString()} placement="top">
        <CardContent>
          <Typography sx={{ color: "text.secondary" }}>
            {textMessage.byUser}
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            {textMessage.message}
          </Typography>
        </CardContent>
      </Tooltip>
    </Card>
  );
}
