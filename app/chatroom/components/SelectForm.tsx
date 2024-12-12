"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Form from "next/form"
import { selectRoom } from "../actions";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Room } from "../page";


export default function SelectForm({roomList}: {roomList: Room[]}) {
  return (
    <Box
      component={Form}
      action={selectRoom}
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: 250 }}
    >
      <Typography variant="h5">Choose your Chatroom</Typography>
      <FormControl fullWidth>
        <InputLabel id="room-select">Chatroom</InputLabel>
        <Select
          labelId="room-select"
          name="selectedRoom"
          label="Chatroom"
          defaultValue={1}
        >
          {roomList.map((room) => (
            <MenuItem key={room.id} value={room.id}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        endIcon={<MeetingRoomIcon />}
        variant="contained"
        type="submit"
        color="success"
      >
        Enter the Time Machine
      </Button>
    </Box>
  );
}
