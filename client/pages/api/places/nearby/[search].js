import GooglePlaceProvider from "google-place-provider";
import Axios from "axios";
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

export default async (req, res) => {
  const { search, location } = req.query;
  const {
    data: { location: geolocation },
  } = await Axios.post(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`
  );

  console.log(process.env.NODE_ENV);

  const devLoc = `${geolocation.lat},${geolocation.lng}`;

  const userLocation =
    process.env.NODE_ENV === "development" ? devLoc : location;

  try {
    const nearbySearch = await googlePlace.nearbySearch({
      location: userLocation,
      radius: 5000,
      keyword: search,
    });
    return res.status(200).json(nearbySearch);
  } catch (error) {
    res.json({ message: error.message });
  }
};
