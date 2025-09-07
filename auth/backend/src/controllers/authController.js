const bcrypt = require('bcrypt');
const pool = require('../db');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );
    res.json({ userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      'SELECT * FROM users WHERE username=$1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).send('Invalid credentials');
    }

    res.json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
};
