
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{
    console.log('Connected to MongoDB')
    app.listen(4000, () => {console.log(`Server running on port 4000`);});
  })
  .catch(err=>console.error('MongoDB connection error:',err));
//mongodb+srv://srivastavay282:PA71qhWrQaoJJ9ah@backendcoding.wr9elar.mongodb.net/Inventory

module.exports = app;