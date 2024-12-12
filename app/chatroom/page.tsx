import { Container, Paper, Typography } from "@mui/material";
import SelectForm from "./components/SelectForm";


async function fetchRoomList() {
  try {
    const response = await fetch("http://localhost:3001/rooms");
    return response.json();
  } catch (e) {
    throw new Error(`Network error: ${e}`);
  }
}

export type Room = {
  name: string,
  id: number
}



export default async function Page() {
  const roomList: Room[] = await fetchRoomList()
    
  if (!roomList || roomList.length === 0) {
    return (
      <Container sx={{height: "91vh", padding: 3}}>
        <Paper elevation={5} sx={{padding: 1, height: '100%', display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="h5">Could not find any chatrooms. Please try again later.</Typography>
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
      <SelectForm roomList={roomList}/>
      </Paper>
    </Container>
  );
}
