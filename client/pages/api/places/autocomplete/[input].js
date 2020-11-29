import GooglePlaceProvider from "google-place-provider";
import Axios from "axios";
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

export default async (req, res) => {
  const { input } = req.query;

  const {
    data: { location },
  } = await Axios.post(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`
  );

  console.log(location);

  try {
    const autocomplete = await googlePlace.autocomplete({
      input,
      location: `${location.lat},${location.lng}`, //"60.6226580961889,16.77756996098595", //Sandviken, Sweden
      radius: "300", //Kilometres
    });
    return res.status(200).json(autocomplete);
  } catch (error) {
    res.json({ message: error.message });
  }
};
