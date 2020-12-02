import { useRouter } from "next/router";
import { geolocated } from "react-geolocated";
import { useContext } from "react";
import ThemeContext from "../theme/Context";
import useSWR from "swr";
import Link from 'next/link';
import Loading from "../components/common/Loading";


function SearchContainer ({ coords, isGeolocationAvailable, isGeolocationEnabled }) {
  const router = useRouter();
  const { search } = router.query;
  const { themeClass, spinnerThemeColor } = useContext(ThemeContext);

  const location = `${coords?.latitude},${coords?.longitude}`;

  const { data } = useSWR(`/api/places/nearby/${search}?location=${location}`);

  console.log(data?.results);
  
  return (
    <div>
      <Loading data={data} theme={themeClass} color={spinnerThemeColor} />
      <h1>Results for: {search}</h1>
      <ul>
        {data?.results.length > 0
          ? data?.results.map(
              item => <Link href={`/place/${item.place_id}`} key={item.place_id}><li>{item.name}</li></Link>
            )
          : 'No results'}
      </ul>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(SearchContainer);
