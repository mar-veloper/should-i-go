import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <div>
      <h1>this is page: {search}</h1>
    </div>
  );
};
