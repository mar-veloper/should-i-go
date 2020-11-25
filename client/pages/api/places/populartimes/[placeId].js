import { Populartimes } from '@christophern/populartimesjs';
const populartimes = new Populartimes();

export default async (req, res) => {
  const { placeId } = req.query;
  try {
    const data = await populartimes.fullWeek(placeId);
    return res
      .status(200)
      .json([{ now: data.currentPopularity }, ...data.popularTimes]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
