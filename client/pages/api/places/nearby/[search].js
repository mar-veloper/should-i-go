import GooglePlaceProvider from "google-place-provider";
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

export default async (req, res) => {
  const { search, location } = req.query;
  try {
    const nearbySearch = await googlePlace.nearbySearch({
      location,
      radius: 5000,
      keyword: search,
    });
    return res.status(200).json(nearbySearch);
  } catch (error) {
    res.json({ message: error.message });
  }
};
