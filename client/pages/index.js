import Head from 'next/head';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import useSWR from 'swr';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
 
import "@reach/combobox/styles.css";

import styles from '../styles/Home.module.css';

const { GOOGLE_API_KEY } = process.env;

export default function Home() {
  const [value, setValue] = useState('');
	const [paramEndpoint, setParamEndpoint] = useState(''); 
  const endpoint = paramEndpoint ? `/api/places/autocomplete/${paramEndpoint}` : null;
	const debouncedSave = useRef(debounce(nextValue => setParamEndpoint(nextValue), 1000))
    .current;
  const { data } = useSWR(endpoint);
  

	const handleOnChange = event => {
		const { value: nextValue } = event.target;
    setValue(nextValue);
    
		debouncedSave(nextValue);
  };

  console.log(data);
  console.log({paramEndpoint, value});
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form>
          {/* <input type="text" value={value} onChange={handleOnChange} /> */}
          <Combobox aria-labelledby="demo">
            <ComboboxInput value={value} onChange={handleOnChange} />
            <ComboboxPopover>
              <ComboboxList>
                {data &&
                  data.predictions.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </form>
      </main>
    </div>
  );
}
