// import '../styles/globals.css';
import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/main.scss";
import style from "../styles/layout.module.scss";

console.log(style);

import { SWRConfig } from "swr";
import Axios from "axios";
import ThemeProvider from "../theme/index";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (...args) => Axios(...args).then((res) => res.data) }}
    >
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
