import { Populartimes } from '@christophern/populartimesjs';
const populartimes = new Populartimes();

export default async (req, res) => {
  const { placeId } = req.query;
  try {
    const data = await populartimes.fullWeek(placeId);
    const days = {};
    const today = data.popularTimes.find(item => item.isToday)?.data;
    data.popularTimes.forEach(item => days[item.day] = item.data );
    

    const busyTime = today
    .map((item, index) => ({hour: index, population: item}))
    .filter(item => item.population >= 60);
  
    console.log(busyTime);

    return res
      .status(200)
      .json({
        now: data.currentPopularity,
        ...days,
        today
      });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// [
//   {
//     hour: ,
//     population: ,
//   },
// ]


// {
//   ...
//   besttime:,

// }