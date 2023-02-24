import { type AppProps } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { api } from "~/utils/api"
import createEmotionCache from "~/createEmotionCache"
import { type EmotionCache } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import theme from "~/theme"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends Omit<AppProps, "pageProps"> {
  pageProps: { session: Session | null }
  emotionCache?: EmotionCache
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  </CacheProvider>
)

export default api.withTRPC(MyApp)
