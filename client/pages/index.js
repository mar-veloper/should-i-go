// Dependencies
import { useRef, useState } from "react";
import { debounce } from "lodash";
import { geolocated } from "react-geolocated";
import useSWR from "swr";

// Components
import Head from "next/head";
import Searchbox from "../components/common/Searchbox";
// Styles
import styles from "../styles/Home.module.css";

function Home({ coords }) {
  const [value, setValue] = useState("");
  const [paramEndpoint, setParamEndpoint] = useState("");

  const debouncedSave = useRef(
    debounce((nextValue) => setParamEndpoint(nextValue), 1000)
  ).current;

  const location = `${coords?.latitude},${coords?.longitude}`;
  const endpoint =
    paramEndpoint &&
    `/api/places/autocomplete/${paramEndpoint}?location=${location}`;
  const { data } = useSWR(endpoint);

  const handleOnChange = (event) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };

  console.dir(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form>
          <Searchbox
            data={data?.predictions}
            value={value}
            onChange={handleOnChange}
          />
          <h1>HELLO :DDDDDDDDDDD this is main page</h1>
        </form>
      </main>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Home);
