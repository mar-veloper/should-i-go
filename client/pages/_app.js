// Dependencies
import { SWRConfig } from "swr";
import Axios from "axios";
// Components
import ThemeProvider from "../theme/index";
import Layout from "../components/layout";
// Styles
import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/main.scss";
import '../styles/loading.scss'

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
