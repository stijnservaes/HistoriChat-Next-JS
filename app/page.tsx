import { auth } from "@clerk/nextjs/server";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth()
  if (!userId) {
    redirect("/sign-in")
  }


  return (
    <Container sx={{ marginTop: "1rem", display: "flex", justifyContent: "center"}}>

    </Container>
  );
}
