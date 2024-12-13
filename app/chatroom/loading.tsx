import { Container, Paper, Typography } from "@mui/material";

export default function Loading() {
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
        <Typography>Loading....</Typography>
      </Paper>
    </Container>
  );
}
