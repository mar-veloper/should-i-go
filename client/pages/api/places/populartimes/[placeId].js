import { Populartimes } from '@christophern/populartimesjs';
const populartimes = new Populartimes();

export default async (req, res) => {
  const { placeId } = req.query;
  try {
    const data = await populartimes.fullWeek(placeId);
    const days = {};
    data.popularTimes.forEach(item => days[item.day] = item.data );
    
    return res
      .status(200)
      .json({ now: data.currentPopularity, ...days });
  } catch (error) {
    res.json({ message: error.message });
  }
};
