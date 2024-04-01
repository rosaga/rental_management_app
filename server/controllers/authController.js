// authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    return res.status(500).json({ message: 'Server Error' });
  }

  try {
    // Check if the user exists
    const user = await db('users').where({ username }).first();
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user});
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db('users').insert({ username, password: hashedPassword, role });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

module.exports = {
  login,
  createUser
};
