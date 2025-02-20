const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword, rol });
    await user.save();
    res.status(201).send('Usuario registrado');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Usuario no encontrado');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Contraseña incorrecta');
    const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;

// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    rol: { type: String, enum: ['admin', 'vendedor'], default: 'vendedor' }
});

module.exports = mongoose.model('User', userSchema);
