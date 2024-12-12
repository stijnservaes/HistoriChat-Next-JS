import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Form from "next/form"
import { selectRoom } from "./actions";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export default async function Page() {
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
        <Box component={Form} action={selectRoom} sx={{display: "flex", flexDirection: "column", gap: 3, width: 250}}>
          <Typography variant="h5">Choose your Chatroom</Typography>
          <FormControl fullWidth>
            <InputLabel id="room-select">Chatroom</InputLabel>
            <Select labelId="room-select" name="selectedRoom" label="Chatroom" defaultValue={10}>
              <MenuItem value={10}>Victorian Era</MenuItem>
              <MenuItem value={20}>Shakespearen Era</MenuItem>
              <MenuItem value={30}>Roman Era</MenuItem>
            </Select>
          </FormControl>
          <Button endIcon={<MeetingRoomIcon />} variant="contained" type="submit" color="success">Enter the Time Machine</Button>
        </Box>
      </Paper>
    </Container>
  );
}
