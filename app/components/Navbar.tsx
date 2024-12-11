import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            HistoriChat
          </Typography>
          <SignedOut>
            <SignInButton>
              <Button variant="text" color="inherit">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
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
