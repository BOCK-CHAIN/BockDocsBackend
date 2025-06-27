const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require('../firebaseAdmin'); // Use the initialized admin instance
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {  password: hashedPassword, email: email },
    });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in' });
  }
};

exports.me = async(req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(200).json({ user: null });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: { id: decoded.id, email: decoded.email } });
  } catch (error) {
    res.status(200).json({error: 'Failed to get current user', user: null });
  }
};
exports.logout = (req, res) => {
  // For stateless JWT, just respond OK (client should remove token)
  res.status(200).json({ message: 'Logged out successfully' });
}

exports.googleAuth = async (req, res) => {
  try {
    const { token, uid, email } = req.body;
    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.uid !== uid || decoded.email !== email) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Upsert user in DB
    const user = await prisma.user.upsert({
      where: { email },
      update: { uid },
      create: { email, uid },
    });
    res.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};