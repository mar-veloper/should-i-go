import Head from 'next/head';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import useSWR from 'swr';

import styles from '../styles/Home.module.css';

const { GOOGLE_API_KEY } = process.env;

export default function Home() {
  const [value, setValue] = useState('');
	const [paramEndpoint, setParamEndpoint] = useState(''); // would be an API call normally

	const debouncedSave = useRef(debounce(nextValue => setParamEndpoint(nextValue), 500))
    .current;
    
    const { data } = useSWR(paramEndpoint ? `/api/places/autocomplete/${paramEndpoint}` : null)
  

	const handleOnChange = event => {
		const { value: nextValue } = event.target;
    setValue(nextValue);
    
		debouncedSave(nextValue);
  };

  console.log(data);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form>
          <input type="text" value={value} onChange={handleOnChange} />
        </form>
      </main>
    </div>
  );
}
