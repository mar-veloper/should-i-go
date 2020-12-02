// Dependencies
import { useRouter } from "next/router";
import { geolocated } from "react-geolocated";
import { useContext } from "react";
import useSWR from "swr";
import Link from 'next/link';
// Context
import ThemeContext from "../theme/Context";
// Components
import Loading from "../components/common/Loading";
// Styles
import styles from '../styles/search.module.scss';


function SearchContainer ({ coords }) {
  const router = useRouter();
  const { search } = router.query;
  const { themeClass, spinnerThemeColor } = useContext(ThemeContext);

  const location = `${coords?.latitude},${coords?.longitude}`;

  const { data } = useSWR(coords && `/api/places/nearby/${search}?location=${location}`);
  
  console.log(data);

  return (
    <>
      <Loading data={data} theme={themeClass} color={spinnerThemeColor} />
      <div className={styles.container}>
          <h1 className={styles.title}>Results for: {search}</h1>
          <ul className={styles.list}>
            {data?.results.length
              ? data?.results.map(
                  item => <Link href={`/place/${item.place_id}`} key={item.place_id}>
                    <li className={`${styles.item} ${styles[themeClass]}`}>
                      {item.name}
                      <span className={styles.small}>{item.vicinity}</span>
                    </li>
                  </Link>
                )
              : 'No results'}
          </ul>
      </div>
    </>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(SearchContainer);
