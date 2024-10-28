export const data = Array.from({ length: 100 }, (_, i) => ({
  name: `Page ${i + 1}`,
  uv: Math.floor(Math.random() * 5000) + 1000, // Random between 1000 and 6000
  pv: Math.floor(Math.random() * 10000) + 1000, // Random between 1000 and 11000
  amt: Math.floor(Math.random() * 3000) + 1000, // Random between 1000 and 4000
}));

export const dataTime = Array.from({ length: 120 }, (_, i) => {
  const minutes = 11 + i; // starting from 10:11
  const hours = Math.floor(minutes / 60) + 10; // adjust hour
  const displayMinutes = minutes % 60;

  return {
    name: `${hours}:${displayMinutes.toString().padStart(2, "0")}`, // format to HH:MM
    uv: Math.floor(Math.random() * 5000), // random sample data
    pv: Math.floor(Math.random() * 5000),
    amt: Math.floor(Math.random() * 5000),
  };
});
