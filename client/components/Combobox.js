import React from "react"; 
const Combobox = () => {

  // .##......##.####.########.
  // .##..##..##..##..##.....##
  // .##..##..##..##..##.....##
  // .##..##..##..##..########.
  // .##..##..##..##..##.......
  // .##..##..##..##..##.......
  // ..###..###..####.##.......

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default Combobox;
