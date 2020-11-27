import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import Link from 'next/link';

import '@reach/combobox/styles.css';

const Searchbox = ({ data, value, onChange }) => {
  return (
    <Combobox aria-labelledby="demo">
      <ComboboxInput value={value} onChange={onChange} />
      <ComboboxPopover>
        <ComboboxList>
          {data &&
            data.map(({ place_id, description }) => (
              <Link key={place_id} href={`/place/${place_id}`}>
                <ComboboxOption value={description} />
              </Link>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default Searchbox;
