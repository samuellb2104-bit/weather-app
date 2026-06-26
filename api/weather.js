export default async function handler(req, res) {
  const { q, zip } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENWEATHER_API_KEY.' });
  }

  const query = q ? `q=${encodeURIComponent(q)}` : zip ? `zip=${encodeURIComponent(zip)}` : '';

  if (!query) {
    return res.status(400).json({ error: 'Provide q or zip.' });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch weather data.' });
  }
}
