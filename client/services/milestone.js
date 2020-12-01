const between = (x, min, max) => x >= min && x <= max;

const milestone = (input, name) => {
  const percentage = Number(input);
  
  switch(true) {
    case between(percentage, 0, 20):
      return `Yay, you're good to go to ${name}!`
    case between(percentage, 21, 40):
      return `${name} is moderately crowded.`
    case between(percentage, 41, 60):
      return `You might not want to go to ${name}...`
    case between(percentage, 61, 80):
      return `${name} is very crowded`;
    case between(percentage, 81, 100):
      return `Do not go to ${name}.`
    default:
      return `No data for ${name}.`
  }
}

export default milestone;
