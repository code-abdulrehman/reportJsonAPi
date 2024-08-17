export function generateRandomFloor() {
    // Generate a random floating-point number between minValue (inclusive) and maxValue (exclusive)
    const randomNumber = Math.random() * (200 - 101) + 101;
    // Apply the floor function to the random number
    const flooredNumber = Math.floor(randomNumber);
    return flooredNumber;
}


export const handleTextareaChange = (e) => {
    setCharCount(e.target.value.length);
    helpers.setValue(e.target.value);
  };