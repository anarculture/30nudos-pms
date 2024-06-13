const app = require('./app');
const port = process.env.PORT || 3001; // Default to port 3001

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
