import {  SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Container } from "@mui/material";

export default async function  Page(){
  const { userId } = await auth()

  if (!userId) {
    return (
      <Container sx={{marginTop: "1rem", display: "flex", justifyContent: "center"}}>
        <SignUp />
      </Container>
    )
  }
}