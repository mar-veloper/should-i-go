import GooglePlaceProvider from 'google-place-provider';
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

console.log();

export default async (req, res) => {
  const { input } = req.query;
  try {
    const autocomplete = await googlePlace.autocomplete({
      input,
    });
    return res.status(200).json(autocomplete);
  } catch (error) {
    res.json({ message: error.message });
  }
};
