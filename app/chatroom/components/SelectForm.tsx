"use client";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Form from "next/form";
import { selectRoom } from "../actions";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Room } from "../page";
import { useActionState, useEffect, useState } from "react";

export default function SelectForm({ roomList }: { roomList: Room[] }) {
  const [state, formAction, isPending] = useActionState(selectRoom, {
    error: false,
    message: "",
  });
  const [errorVisible, setErrorVisible] = useState(true);

  useEffect(() => setErrorVisible(true), [state]);

  return (
    <Box
      component={Form}
      action={formAction}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: 250,
        position: "relative",
      }}
    >
      <Typography variant="h5">Choose your Chatroom</Typography>
      {state.error && errorVisible && (
        <Box sx={{ position: "absolute", top: -80, width: 250 }}>
          <Collapse in={errorVisible}>
            <Alert
              severity="error"
              variant="outlined"
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  color="inherit"
                  onClick={() => setErrorVisible(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {state.message}
            </Alert>
          </Collapse>
        </Box>
      )}
      {isPending ? (
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}
