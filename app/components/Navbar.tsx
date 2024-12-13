import { SignedIn, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

export default function NavBar() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            HistoriChat
          </Typography>
          <ForumIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
          </SignedIn>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
