const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.port || 3000
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes)

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})