import { useRouter } from 'next/router';


export default () => {
  const router = useRouter();

  const { placeId } = router.query;

  return (
    <div>
      <h1>This is place with id {placeId}</h1>
    </div>
  );
}