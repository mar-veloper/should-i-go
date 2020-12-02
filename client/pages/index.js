// Dependencies
import { useContext, useRef, useState } from "react";
import { debounce } from "lodash";
import { geolocated } from "react-geolocated";
import useSWR from "swr";

// Components
import Head from "next/head";
import Searchbox from "../components/common/Searchbox";

// Styles
import styles from "../styles/index.module.scss";
import ThemeContext from "../theme/Context";


function Home({ coords }) {
  const [value, setValue] = useState("");
  const [paramEndpoint, setParamEndpoint] = useState("");

  const debouncedSave = useRef(
    debounce((nextValue) => setParamEndpoint(nextValue), 1000)
  ).current;

  const { bgTheme } = useContext(ThemeContext);

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

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${bgTheme})` }}
    >
      <Head>
        <title>Should I Go</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.inner}>
        <h3 className={styles.title}>Enter a place to check how crowded it is!</h3>
        <Searchbox
          data={data?.predictions}
          value={value}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Home);
