export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { deliveryId } = req.body;

  if (!deliveryId) {
    return res.status(400).json({ error: 'Missing deliveryId' });
  }

  try {
    const response = await fetch('https://www.cargo.co.il/api/Track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deliveryId }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
