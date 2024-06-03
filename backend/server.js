const app = require('./app');
const config = require('./config');

// Start the server
const host = '0.0.0.0';
const port = config.PORT || 8080;
app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
