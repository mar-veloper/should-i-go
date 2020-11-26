import GooglePlaceProvider from 'google-place-provider';
const { GOOGLE_API_KEY } = process.env;
const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

export default async (req, res) => {
  const { placeId } = req.query;
  try {
    const placeDetails = await googlePlace.placeDetails({
      place_id: placeId,
    });
    return res.status(200).json(placeDetails);
  } catch (error) {
    res.json({ message: error.message });
  }
};
