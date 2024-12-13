import { Alert, Container, Paper } from "@mui/material";
import ChatWindow from "./components/ChatWindow";
import { auth } from "@clerk/nextjs/server";

export type ChatMessage = {
  _id: string,
  message: string,
  byUser: string,
  roomId: number,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = Number((await params).roomId);
  const { getToken } = await auth()

  const response = await fetch(`${process.env.BACKEND_URL}/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  })
  const fetchObject:{ success: boolean, message: string | ChatMessage[]} = await response.json()



  if (!fetchObject.success || typeof fetchObject.message === "string") {
    return (
      <Container sx={{height: "91vh", padding: 3}}>
      <Paper sx={{padding: 1, height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}} elevation={5}>
        <Alert variant="outlined" severity="error">{fetchObject.message as string}. Try again.</Alert>
      </Paper>
    </Container>
    )
  }

  return (
    <Container sx={{height: "91vh", padding: 3}}>
      <Paper sx={{padding: 1, height: "100%"}} elevation={5}>
        <ChatWindow roomId={roomId} initialMessages={fetchObject.message}/>
      </Paper>
    </Container>
  )
}



