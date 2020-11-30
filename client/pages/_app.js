// import '../styles/globals.css';
import "../styles/main.scss";
import { SWRConfig } from "swr";
import Axios from "axios";
import ThemeProvider from "../theme/index";
import ThemeToggle from "../components/common/ThemeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (...args) => Axios(...args).then((res) => res.data) }}
    >
      <ThemeProvider>
        <ThemeToggle />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
