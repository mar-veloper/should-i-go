import '../styles/globals.css';
import '../styles/main.scss';
import { SWRConfig } from 'swr';
import Axios from 'axios';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{ fetcher: (...args) => Axios(...args).then(res => res.data) }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
