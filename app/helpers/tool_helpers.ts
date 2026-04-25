export const requestWeatherAPI = async (city: string) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`,
  );
  const data = await res.json();

  return data.current;
};
export const generateTitle = async (input: string) => {
  const res = await fetch(`/api/title`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  const data = await res.json();

  const str = data.title as string;

  const formatedTitle =
    str.startsWith('"') && str.endsWith('"') ? str.slice(1, -1) : str;

  return formatedTitle;
};
