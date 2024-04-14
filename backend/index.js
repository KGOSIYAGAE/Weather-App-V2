import express from "express";

const app = express();
const port = 3000;

app.use(port, () => {
  console.log(`Server running on port${port}`);
});
