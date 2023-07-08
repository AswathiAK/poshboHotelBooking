const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send("BackEnd is Running");
});
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
})