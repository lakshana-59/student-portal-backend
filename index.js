import express from 'express';
import sequelize from './Model/db.js';
import login from './Model/schema.js';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync(); 
    console.log('All models synchronized.');

    
  } catch (err) {
    console.error('Failed to initialize DB:', err);
  }
}


app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await login.create({
      email,
      password: hashedPassword,
    });
    const userResponse = { id: newUser.id, email: newUser.email };
    res.status(201).json(userResponse);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await login.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Successful login — respond without password
    const userResponse = { id: user.id, email: user.email };
    res.json({ message: 'Login successful', user: userResponse });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});


async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    }); 
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
