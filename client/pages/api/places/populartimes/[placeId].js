import { Populartimes } from '@christophern/populartimesjs';
const populartimes = new Populartimes();

export default async (req, res) => {
  const { placeId } = req.query;
  try {
    const data = await populartimes.fullWeek(placeId);
    const days = {};
    const today = data.popularTimes.find(item => item.isToday)?.data;
    data.popularTimes.forEach(item => days[item.day] = item.data );

    const sortedTimes = today
      .map((item, index) => ({hour: index, population: item}))
      .sort((a, b) => b.population - a.population);

    const bestTime = sortedTimes
      .filter(item => item.population)
      .sort((a, b) => a.population - b.population);

    return res
      .status(200)
      .json({
        now: data.currentPopularity,
        ...days,
        today,
        busiestHour: sortedTimes[0],
        bestHour: bestTime[0],
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};