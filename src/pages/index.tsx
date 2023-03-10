import { type NextPage } from "next"
import Head from "next/head"
import { signIn, signOut, useSession } from "next-auth/react"

import { api } from "~/utils/api"
import { Box, Button, Container, Grid, Typography } from "@mui/material"
import AppNavBar from "./components/AppNavBar"

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" })

  return (
    <>
      <Head>
        <title>Create T3 App - MUI 5</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppNavBar />
      <Container component="main" maxWidth="lg">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent={"center"}
          paddingY="2rem"
        >
          <Grid item xs={12} paddingY="2rem">
            <Typography textAlign="center" variant="h1">
              Create T3 App - MUI 5
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}{" "}
            <AuthShowcase />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession()

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  )

  return (
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>

      <Button
        variant="outlined"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  )
}
