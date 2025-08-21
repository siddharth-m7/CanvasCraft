require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
require('dotenv').config();


// Routes
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());


// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false, // if you stream/canvas; remove if not needed
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'", "'unsafe-inline'"], // Tailwind/inline styles
      "img-src": ["'self'", "data:", "blob:"],
      "connect-src": ["'self'", process.env.SUPABASE_URL], // add any extra APIs you call
      "frame-ancestors": ["'none'"],
    },
  },
}));
app.use(cookieParser());
app.use(morgan('combined'));

const allowedOrigin = process.env.CLIENT_URL;
app.use(cors({
  origin: function (origin, cb) {
    if (!origin || origin === allowedOrigin) return cb(null, true);
    return cb(new Error('CORS blocked'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-CSRF-Token'],
}));

// basic rate-limit for auth routes
if (process.env.NODE_ENV === 'production') {
  const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,                 // limit each IP to 100 requests per window
    standardHeaders: true,    // return rate limit info in RateLimit-* headers
    legacyHeaders: false,
  });
app.use('/api/auth', authLimiter);
}

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));


// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});