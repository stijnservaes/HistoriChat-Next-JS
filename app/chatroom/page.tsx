import { Container, Paper, Typography } from "@mui/material";
import SelectForm from "./components/SelectForm";
import { auth } from "@clerk/nextjs/server";


export type Room = {
  name: string,
  id: number
}

type Response = {
  success: boolean,
  message: string | Room[]
}

async function fetchRoomList() {
  try {
    const {getToken} = await auth()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`
      }
    });

    return await response.json();
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }
}


export default async function Page() {
  const response: Response = await fetchRoomList()
    
  if (!response.success || response.message.length === 0) {
    return (
      <Container sx={{height: "91vh", padding: 3}}>
        <Paper elevation={5} sx={{padding: 1, height: '100%', display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="h6" sx={{textAlign: "center"}}>Could not find any chatrooms.<br />Please try again later.</Typography>
        </Paper>
      </Container>
    )
  }


  return (
    <Container sx={{ height: "91vh", padding: 3 }}>
      <Paper
        sx={{
          padding: 1,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={5}
      >
      <SelectForm roomList={response.message as Room[]}/>
      </Paper>
    </Container>
  );
}
