import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../src/components/Layouts/Layout.js";
import { UserProvider } from "../src/contexts/UserContext";
import { mainThemeColor } from "../src/constants/constant";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "DM Sans",
  },
  palette: {
    primary: {
      main: mainThemeColor,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
