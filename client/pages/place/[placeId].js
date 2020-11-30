import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Map from "../../components/Map/";

const { GOOGLE_API_KEY } = process.env;

export default function PlaceContainer({ googleApiKey }) {
  const router = useRouter();
  const { placeId } = router.query;

  const { data: detailsData } = useSWR(`/api/places/details/${placeId}`);
  const { data: densityData } = useSWR(`/api/places/populartimes/${placeId}`);

  const coords = {
    lat: detailsData?.result.geometry.location.lat,
    lng: detailsData?.result.geometry.location.lng,
  };

  console.log(densityData);

  return (
    <div>
      <nav className="search-nav">
        <p className="search-nav-copy">Should I go to</p>
        <Input />
      </nav>

      <section className="map-placeholder">
        <Map.Container
          coords={coords}
          label={detailsData?.result.name}
          googleApiKey={googleApiKey}
        />
      </section>
      <section className="hero-content">
        <h3 className="question">
          Yay, you're good to go to {detailsData?.result.name}!
        </h3>
      </section>

      <section className="data-live">
        <h4 className="data-title">How crowded is it now?</h4>
        <div className="data-live-visual">
          {
            <p className="data-live-value">
              {!densityData
                ? "Loading ..."
                : densityData?.now
                ? `${densityData?.now}%`
                : "No data provided."}
            </p>
          }
          <div className="circle"></div>
        </div>
        <Button label="Live" className="selected" />
        <Button label="Average" />
      </section>

      <section className="data-day">
        <h4 className="data-title">Day overview</h4>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      googleApiKey: GOOGLE_API_KEY,
    },
  };
}