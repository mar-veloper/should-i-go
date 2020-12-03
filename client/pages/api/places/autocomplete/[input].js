import GooglePlaceProvider from "google-place-provider";
import Axios from "axios";
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

export default async (req, res) => {
  const { input, location } = req.query;
  const {
    data: { location: geolocation },
  } = await Axios.post(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`
  );

  const devLoc = `${geolocation.lat},${geolocation.lng}`;

  const userLocation =
    process.env.NODE_ENV === "development" ? devLoc : location;

  try {
    const autocomplete = await googlePlace.autocomplete({
      input,
      location: userLocation,
      radius: 300,
    });
    return res.status(200).json(autocomplete);
  } catch (error) {
    res.json({ message: error.message });
  }
};
