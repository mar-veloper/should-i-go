import useSWR from 'swr';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const { placeId } = router.query;

  const { data: detailsData } = useSWR(`/api/places/details/${placeId}`);
  const { data: densityData } = useSWR(`/api/places/populartimes/${placeId}`);
  console.log(densityData);

  return (
    <div>
      <h1>This is place with id {detailsData?.result.name}</h1>
      <h1>Currently there are: {densityData?.now}% </h1>
    </div>
  );
}