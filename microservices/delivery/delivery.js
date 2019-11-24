const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Delivery app listening on port ${PORT}!`);
});
