import axios from "axios";

export default async (req, res) => {
  try {
    const lat = 51.259495
    const lon = -0.840159
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    
    const response = await axios.get(URL);
    res.status(200).json({ data: response.data })
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch data' })
  }
}