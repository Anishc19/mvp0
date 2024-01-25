// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// app.use('/search', createProxyMiddleware({ 
//   target: 'https://serpapi.com', 
//   changeOrigin: true 
// }));

// // app.listen(3000);
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api', async (req, res) => {
  try {
    const url = 'https://serpapi.com/search?api_key=5f8345fcc4ac8c1e7e33c87dd4a2f561f8f7ca92c2f94678bb3166c5cd902ae6';
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));