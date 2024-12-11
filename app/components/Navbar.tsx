import { SignedIn, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            HistoriChat
          </Typography>
          <SignedIn>
            <UserButton
              appearance={{ elements:{avatarBox: "size-10"} }}
            />
          </SignedIn>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
