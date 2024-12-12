import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Box, Container, Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <Container
        sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}
      >
        <Stack
          spacing={2}
          direction={{ sm: "column", md: "row" }}
          sx={{alignItems: "center" }}
        >
          <Stack
            spacing={4}
            direction="column"

            sx={{
              padding: 5,
              height: "100%",
              maxWidth: 450,
            }}
          >
            <Stack direction="row" gap={2}>
              <AutoAwesomeIcon
                sx={{ color: "text.secondary", marginTop: 0.5 }}
              />
              <Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontWeight: "medium" }}
                >
                  AI-Powered Chatroom
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Powered by OpenAI&apos;s GPT-4o mini.
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" gap={2}>
              <HistoryEduIcon
                sx={{ color: "text.secondary", marginTop: 0.5 }}
              />
              <Stack>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontWeight: "medium" }}
                >
                  Time Travel Made Easy
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Step into any era and immerse yourself in historical dialogue
                  like never before.
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap={2}>
              <DynamicFeedIcon
                sx={{ color: "text.secondary", marginTop: 0.5 }}
              />
              <Stack>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ fontWeight: "medium" }}
                >
                  Era-Specific Chatrooms
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Choose your timeline and join conversations shaped by the
                  social and cultural context of the time.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <SignUp />
        </Stack>
      </Container>
    );
  }
}
