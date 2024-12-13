import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ClerkProvider } from "@clerk/nextjs";
import { dark} from '@clerk/themes'
import type { Metadata } from "next";
import "./globals.css"
import theme from "./theme";
import NavBar from "./components/Navbar";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HistoriChat",
  description: "AI-Powered Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en" className={roboto.className}>
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline  enableColorScheme/>
              <header>
                <NavBar />
              </header>
              <main>{children}</main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
