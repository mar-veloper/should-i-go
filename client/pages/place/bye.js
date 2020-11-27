import useSWR from "swr";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useRouter } from "next/router";
import Map from "../../components/Map/";
const { GOOGLE_API_KEY } = process.env;

const Place = ({ googleApiKey }) => {
  const router = useRouter();
  const { placeId } = router.query;

  const { data: detailsData } = useSWR(`/api/places/details/${placeId}`);
  const { data: densityData } = useSWR(`/api/places/populartimes/${placeId}`);

  const coords = {
    lat: detailsData?.result.geometry.location.lat,
    lng: detailsData?.result.geometry.location.lng,
  };

  return (
    <Map.Container
      coords={coords}
      label={detailsData?.result.name}
      googleApiKey={googleApiKey}
    />
  );
};

export async function getServerSideProps() {
  return {
    props: {
      googleApiKey: GOOGLE_API_KEY,
    },
  };
}

export default Place;
