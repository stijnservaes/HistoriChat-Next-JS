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
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Room } from "../page";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SelectForm({ roomList }: { roomList: Room[] }) {
  const [selectedRoom, setSelectedRoom] = useState(roomList[0].id)

  function handleClick() {
    redirect(`/chatroom/${selectedRoom}`)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: 250,
        position: "relative",
      }}
    >
      <Typography variant="h5">Choose your Chatroom</Typography>

      <FormControl fullWidth>
        <InputLabel id="room-select">Chatroom</InputLabel>
        <Select
          labelId="room-select"
          name="selectedRoom"
          label="Chatroom"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(Number(e.target.value))}
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
        onClick={handleClick}
      >
        Enter the Time Machine
      </Button>
    </Box>
  );
}
