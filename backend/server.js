const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 
 
const app = express(); 
const PORT = process.env.PORT || 5000; 
 
app.use(express.json()); 
app.use(cors()); 
 
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB conectado')).catch(err => console.log(err)); 
 
const userRoutes = require('./routes/userRoutes'); 
app.use('/api/users', userRoutes); 
 
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`)); 
