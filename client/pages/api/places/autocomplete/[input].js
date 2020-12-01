import GooglePlaceProvider from "google-place-provider";
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

export default async (req, res) => {
  const { input, location } = req.query;
  try {
    const autocomplete = await googlePlace.autocomplete({
      input,
      location,
      radius: 300,
    });
    return res.status(200).json(autocomplete);
  } catch (error) {
    res.json({ message: error.message });
  }
};
